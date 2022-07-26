var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
const Product = require("../models/product");
const Category = require("../models/category");
const { check, validationResult } = require("express-validator/check");

//Save Product
router.post(
  "/",
  [
    check("pid", "Please Enter a product Id").not().isEmpty(),
    check("name", "Please Enter a product name").not().isEmpty(),
    check("productImage", "Please provide product image link").not().isEmpty(),
    check("description", "Please Enter a description").not().isEmpty(),
    check("price", "Please Enter a price").not().isEmpty(),
    check("category", "Please select a category").not().isEmpty(),
  ],
  auth,
  async (req, res) => {
    if (req.user !== null && req.user.isAdmin) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).send({ status: "failed", errors: errors.array() });
      } else {
        try {
          //get data from request body
          const {
            pid,
            name,
            price,
            category,
            discountPrice,
            productImage,
            description,
            color,
            material,
            size,
            isTopProduct,
          } = req.body;

          //check if category exists
          var objCategory = await Category.findOne({ name: category });
          //if category doesnt exist , create one
          if (objCategory === null) {
            objCategory = new Category({
              name: category,
            });
            objCategory.save();
          }
          //create product object
          const product = new Product({
            pid,
            name,
            price,
            discountPrice,
            productImage,
            description,
            color,
            material,
            size,
            isTopProduct,
          });
          //assign category to product
          product.category = objCategory;
          //save product
          const data = await product.save();
          //send success response
          res.status(201).json({ message: "Product Saved", data });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Product save failed" });
        }
      }
    } else {
      res.status(403).json({ message: "Access Denied" });
    }
  }
);

//delete product
router.delete("/:id", auth, async (req, res) => {
  if (req.user !== null && req.user.isAdmin) {
    try {
      const id = req.params.id;
      const data = await Product.remove({ _id: id });
      res.status(200).json({
        status: "success",
        message: "product deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Product deleted failed" });
    }
  } else {
    res.status(403).json({ message: "Access Denied" });
  }
});

//update product
router.patch(
  "/:id",
  [
    check("pid", "Please Enter a product Id").not().isEmpty(),
    check("name", "Please Enter a product name").not().isEmpty(),
    check("productImage", "Please provide product image link").not().isEmpty(),
    check("description", "Please Enter a description").not().isEmpty(),
    check("price", "Please Enter a price").not().isEmpty(),
    check("category", "Please select a category").not().isEmpty(),
  ],
  auth,
  async (req, res) => {
    const id = req.params.id;
    if (req.user !== null && req.user.isAdmin) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).send({ status: "failed", errors: errors.array() });
      } else {
        try {
          var objCategory = await Category.findOne({ name: req.body.category });
          if (objCategory === null) {
            objCategory = new Category({
              name: req.body.category,
            });
            objCategory.save();
          }

          Product.updateOne(
            { _id: id },
            {
              $set: {
                pid: req.body.pid,
                name: req.body.name,
                price: req.body.price,
                discountPrice: req.body.discountPrice,
                productImage: req.body.productImage,
                description: req.body.description,
                color: req.body.color,
                material: req.body.material,
                size: req.body.size,
                isTopProduct: req.body.isTopProduct,
                category: objCategory,
              },
            },
            function (error, result) {
              if (error) {
                console.log(error);
                res.status(500).json({
                  status: "failed",
                  message: "product update failed",
                });
              }

              // send success response
              res.status(200).json({
                status: "success",
                message: "product edited successfully",
              });
            }
          );
        } catch (error) {
          console.log(error);
          res.status(500).json({
            status: "fail",
            message: "product update failed",
          });
        }
      }
    } else {
      res.status(403).json({ message: "Access Denied" });
    }
  }
);

module.exports = router;
