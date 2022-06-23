var express = require('express');
const { check, validationResult } = require("express-validator/check");
var router = express.Router();

const Product = require("../model/product");
const auth = require("../middleware/auth");
const User = require("../model/User");

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
    res.render('addProduct', '');
  }
  else
  {
    res.render('error', { "message" : "Access Denied"});
  }
  });

  router.post(
    "/Add",
    [
      check("productId", "Please Enter a Product Id").not().isEmpty(),
      check("productName", "Please Enter a Product Name").not().isEmpty(),
      check("productDescription", "Please Enter a Description").not().isEmpty(),
      check("price", "Please Enter a price").not().isEmpty()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.render('addProduct', { errors: errors.array() });
      }
      else
      {
        console.log(req.body);
        const { productId , productName , productDescription , price } = req.body;
  
        try {
          let product = await Product.findOne({
            productId
          });
          if (product) {
            console.log(product);
            res.render('addProduct', {msg: "Product Already Exists"});
          }
          else
          {
  
            product = new Product({
              productId,
              productName,
              productDescription,
              price
              });
  
              await product.save();
  
              res.render('addProduct', {msgSuccess: "Product Added Successfully"});
          }
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Error in validating Product!");
        }
      }
    }
  );

module.exports = router;
