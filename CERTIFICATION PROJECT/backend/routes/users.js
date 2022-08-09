var express = require("express");
var router = express.Router();
var User = require("../models/user");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
var fs = require("fs");
var path = require("path");

const DIR = "./public/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

//register
router.post(
  "/register",
  [
    check("firstname", "Please Enter a first name").not().isEmpty(),
    check("email", "Please Enter an email").not().isEmpty(),
    check("email", "Please Enter a valid email").isEmail(),
    check("password", "Please Enter a Valid Password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send({ status: "failed", errors: errors.array() });
    } else {
      const { firstname, lastname, email, password } = req.body;

      try {
        let user = await User.findOne({
          email,
        });

        if (user) {
          res
            .status(400)
            .send({ status: "failed", message: "User already exists" });
        } else {
          user = new User({
            firstname,
            lastname,
            email,
            password,
          });

          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);

          await user.save();

          res
            .status(200)
            .send({ status: "Success", message: "User created successfully" });
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Error in validating user!");
      }
    }
  }
);

router.post("/login", [
  check("email", "Please enter an email").not().isEmpty(),
  check("password", "Please enter a valid password").isLength({
    min: 6,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send({ status: "failed", errors: errors.array() });
    } else {
      const { email, password } = req.body;
      try {
        let user = await User.find({
          email: email,
          isDeleted: false,
        });

        if (!user) {
          res
            .status(400)
            .send({ status: "failed", error: "User does not exist" });
        } else {
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            res
              .status(400)
              .send({ status: "failed", error: "Incorrect Password" });
          } else {
            const payload = {
              user: {
                id: user.id,
                email: user.email,
                isAdmin: user.isAdmin,
              },
            };
            jwt.sign(
              payload,
              "randomString",
              {
                expiresIn: 3600,
              },
              (err, token) => {
                if (err) throw err;
                //res.header('Authorization', 'Bearer '+ token);
                res.status(200).send({
                  status: "Success",
                  message: "user logged in successfully",
                  accessToken: token,
                });
              }
            );
          }
        }
      } catch (e) {
        console.error(e);
        res.status(500).send({
          status: "Error",
          message: "An internal error has occured",
        });
      }
    }
  },
]);

//get profile
router.post("/", auth, async (req, res) => {
  try {
    const profile = await User.findById(req.user.id);
    profile["password"] = undefined;
    delete profile["password"];
    res.status(200).json({
      status: "success",
      profile,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Could not fetch user profile" });
  }
});

//update profile image
router.patch(
  "/image",
  auth,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const url = req.protocol + "://" + req.get("host");
      let fullFileName = url + "/public/" + req.file.filename;
      const userObj = await User.findById(req.user.id);

      userObj.profileImage = fullFileName;

      await User.findOneAndUpdate({ _id: req.user.id }, userObj, {
        upsert: true,
      });
      res.status(200).json({
        status: "success",
        message: "profile image updated successfully",
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Could not update profile image" });
    }
  }
);

//update user
router.patch("/", auth, async (req, res) => {
  try {
    console.log(req);
    await User.updateOne(
      { _id: req.body._id },
      {
        $set: {
          phone: req.body.phone,
          interests: req.body.interests,
          email: req.body.email,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          address: req.body.address,
          updatedOn: new Date().toLocaleString(),
        },
      }
    );

    res.status(200).json({
      status: "success",
      message: "profile address updated successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Could not update profile address" });
  }
});

//delete user
router.delete("/:id", auth, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await User.updateOne(
        { _id: req.params.id },
        {
          $set: {
            isDeleted: "true",
            updatedOn: new Date().toLocaleString(),
          },
        }
      );

      res.status(200).json({
        status: "success",
        message: "profile deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Could not delete profile" });
    }
  } else {
    res.status(403).json({ message: "Access Denied" });
  }
});

//delete user profile image
router.delete("/image", auth, async (req, res) => {
  try {
    const userObj = await User.findById(req.user.id);

    let filePath = "public\\" + path.basename(userObj.profileImage);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      //file removed
    });

    userObj.profileImage = "";

    await User.updateOne(
      { _id: req.user.id },
      {
        $set: {
          profileImage: "",
          updatedOn: new Date().toLocaleString(),
        },
      }
    );

    res.status(200).json({
      status: "success",
      message: "profile image deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Could not delete profile image" });
  }
});

//get all user profile
router.get("/", auth, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const userList = await User.find({ isDeleted: false });

      res.status(200).json({
        status: "success",
        users: userList,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Could not fetch users" });
    }
  } else {
    res.status(403).json({ message: "Access Denied" });
  }
});

//create new user
router.post(
  "/addUser",
  [
    check("firstname", "Please Enter a first name").not().isEmpty(),
    check("email", "Please Enter an email").not().isEmpty(),
    check("email", "Please Enter a valid email").isEmail(),
    check("password", "Please Enter a Valid Password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send({ status: "failed", errors: errors.array() });
    } else {
      const { email } = req.body;
      try {
        let user = await User.findOne({
          email,
        });

        if (user) {
          res
            .status(400)
            .send({ status: "failed", message: "User already exists" });
        } else {
          user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            interests: req.body.interests,
            address: req.body.address,
          });

          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(req.body.password, salt);

          const data = await user.save();

          res.status(200).send({ status: "Success", user: data });
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Error in validating user!");
      }
    }
  }
);

module.exports = router;
