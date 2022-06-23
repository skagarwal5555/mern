var express = require('express');
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var router = express.Router();

const User = require("../model/User");
const auth = require("../middleware/auth");
/* GET users listing. */


router.get('/login', function(req, res, next) {
  res.render('login', '');
});

router.get('/add', auth, async (req, res) => {
  let authorized = false;
  let userName = "";
  if(req.user)
  {
      const user = await User.findById(req.user.id);
      if(user && user.userCategory=="Admin")
      {
        authorized = true;
      }
  }

  if(authorized)
  {
    res.render('addUser', '');
  }
  else
  {
    res.render('error', { "message" : "Access Denied"});
  }
});

router.get('/register', function(req, res, next) {
  res.render('register', '');
});


router.get('/view', auth, async (req, res) => {
  let authorized = false;
  let userName = "";
  if(req.user)
  {
      const user = await User.findById(req.user.id);
      if(user && user.userCategory=="Admin")
      {
        authorized = true;
      }
  }

  if(authorized)
  {
    var allRecords = await User.find({});
    console.log(allRecords);
    res.render('userList', { "user_list": allRecords });
  }
  else
  {
    res.render('error', { "message" : "Access Denied"});
  }
});

router.post(
  "/register",
  [
    check("username", "Please Enter a Valid Username").not().isEmpty(),
    check("password", "Please Enter a Valid Password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('register', { errors: errors.array() });
    }
    else
    {

      let userCategory = "Normal";
      const { username, password } = req.body;

      try {
        let user = await User.findOne({
          username
        });
        if (user) {
          res.render('register', {msg: "User Already Exists"});
        }
        else
        {

            user = new User({
              username,
              password,
              userCategory
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            res.render('register', {msgSuccess: "User Registered Successfully"});
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Error in validating user!");
      }
    }
  }
);

router.post(
  "/Add",
  [
    check("username", "Please Enter a Valid Username").not().isEmpty(),
    check("password", "Please Enter a Valid Password").isLength({
      min: 6,
    }),
    check("userCategory", "Please select a user category").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('addUser', { errors: errors.array() });
    }
    else
    {
      const { username, password , userCategory } = req.body;

      try {
        let user = await User.findOne({
          username
        });
        if (user) {
          res.render('addUser', {msg: "User Already Exists"});
        }
        else
        {

            user = new User({
              username,
              password,
              userCategory
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            res.render('addUser', {msgSuccess: "User Added Successfully"});
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Error in validating user!");
      }
    }
  }
);


router.post("/login", [
  check("username", "Please enter a valid username").not().isEmpty(),
  check("password", "Please enter a valid password").isLength({
    min: 6,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('login', { errors: errors.array() });
    }
    else
    {
      const { username, password } = req.body;
      try {
        let user = await User.findOne({
          username
        });
        if (!user)
        {
          res.render('login', {msg: "User does not exist"});
        }
        else
        {
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            res.render('login', {msg: "Incorrect Password"});
          }
          else
          {
            const payload = {
              user: {
                id: user.id,
                userCategory: user.userCategory
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
                res.cookie("access_token", token, {
                  httpOnly: true
                }).redirect('/');
              }
            );
          }
        }
      } catch (e) {
        console.error(e);
        res.render('login', {msg: "Server Error"});
      }
    }
  },
]);

module.exports = router;
