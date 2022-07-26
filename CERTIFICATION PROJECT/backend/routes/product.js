var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
const Product = require("../models/product");
const Category = require("../models/category");
const { check, validationResult } = require("express-validator/check");

//get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({}).populate("category");
    res.status(200).json({
      status: "success",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Product fetch failed" });
  }
});

//get product details by Id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id, { id });
    const product = await Product.findById(id).populate("category");
    res.status(200).json({
      status: "success",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Product search failed" });
  }
});

module.exports = router;
