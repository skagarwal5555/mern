var express = require('express');
const { check, validationResult } = require("express-validator/check");
var router = express.Router();

const Product = require("../model/product");
const User = require("../model/User");

const auth = require("../middleware/auth");

/* GET home page. */
router.get('/', auth, async (req, res) =>  {
  let authorized = false;
  let userName = "";
  if(req.user)
  {
      const user = await User.findById(req.user.id);
      if(user)
      {
        authorized = true;
        userName =  user.username;
        console.log(user);
      }
  }
  var allRecords = await Product.find({});
  res.render('index', { "product_list": allRecords , "authorized": authorized, "userName" : userName });
});

module.exports = router;
