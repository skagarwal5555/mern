var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
const Product = require("../models/product");
const Category = require("../models/category");
const { check, validationResult } = require("express-validator/check");

//get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false }).populate(
      "category"
    );
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
    const product = await Product.findOne({
      _id: id,
      isDeleted: false,
    }).populate("category");
    res.status(200).json({
      status: "success",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Product search failed" });
  }
});

router.get("/name/:name", async (req, res) => {
  try {
    const name = req.params.name;
    console.log(name);
    const products = await Product.find({
      name: { $regex: name, $options: "i" },
      isDeleted: false,
    });
    res.status(200).json({
      status: "success",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Product search failed" });
  }
});

module.exports = router;
