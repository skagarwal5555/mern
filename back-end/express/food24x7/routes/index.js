var express = require('express');
const { check, validationResult } = require("express-validator/check");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Product = require("../model/product");
const auth = require("../middleware/auth");
const User = require("../model/User");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post(
  "/register",
  [
    check("username", "Please Enter a Valid Username").not().isEmpty(),
    check("email", "Please Enter a email").not().isEmpty(),
    check("email", "Please Enter a valid email").isEmail(),
    check("password", "Please Enter a Valid Password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    else
    {
      const { username, password , email } = req.body;

      try {
        let user = await User.findOne({
          username
        });
        if (user) {
          return res.status(200).json({
            msg: "User Already Exists",
          });
        }
        else
        {

            user = new User({
              username,
              password,
              email
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            return res.status(200).json({
              Status: "User created successfully",
            });
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
      return res.status(400).json({
        errors: errors.array(),
      });
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
          return res.status(400).json({
            message: "User Does Not Exist!",
          });
        }
        else
        {
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(200).json({
              message: "Incorrect Password",
            });
          }
          else
          {
            const payload = {
              user: {
                id: user.id
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
                res.status(200).json({
                  userid : user.id,
                  token,
                });
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

router.get('/products', auth, async (req, res) => {
  let authorized = false;
  if(req.user)
  {
      const user = await User.findById(req.user.id);
      if(user)
      {
        authorized = true;
      }
  }

  if(authorized)
  {
    const allrecords = await Product.find({},"name description price");
    res.json(allrecords);
  }
  else
  {
    return res.status(400).json({
      message: "Invalid Token. Authentication failed",
    });
  }
  });

  router.post(
    "/AddProduct",
    [
      check("name", "Please Enter a Product Id").not().isEmpty(),
      check("description", "Please Enter a Description").not().isEmpty(),
      check("price", "Please Enter a price").not().isEmpty()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
      else
      {
        console.log(req.body);
        const { name , description , price } = req.body;
  
        try {
          let product = await Product.findOne({
            name
          });
          if (product) {
            console.log(product);
            return res.status(400).json({
              message: "Product Already exists",
            });
          }
          else
          {
  
            product = new Product({
              name,
              description,
              price
              });
  
              await product.save();
  
              return res.status(200).json({
                Status: "Product Added Successfully",
              });
          }
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Error in validating Product!");
        }
      }
    }
  );

module.exports = router;
