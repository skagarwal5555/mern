var express = require("express");
var router = express.Router();
var User = require("../models/user");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
        let user = await User.findOne({
          email,
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

router.patch("/image", auth, async (req, res) => {
  try {
    const userObj = await User.findById(req.user.id);
    userObj.profileImage = req.body.profileimage;

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
});

router.patch("/address", auth, async (req, res) => {
  try {
    const userObj = await User.findById(req.user.id);
    userObj.address = req.body;
    console.log(userObj.address);
    await User.updateOne(
      { _id: req.user.id },
      {
        $set: {
          address: req.body,
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

router.delete("/image", auth, async (req, res) => {
  try {
    const userObj = await User.findById(req.user.id);
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
module.exports = router;
