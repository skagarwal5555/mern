var express = require("express");
var router = express.Router();
const Product = require("../models/product");
const Categories = require("../models/category");

/* GET home page banner. */
router.get("/banner", async (req, res) => {
  try {
    var products = await Product.find()
      .select({ name: 1, productImage: 1 })
      .sort({ created_at: -1 });
    products = products.splice(0, 3);
    res.status(200).json({
      status: "success",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Product couldnt be fetched for banner" });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await Categories.aggregate([
      {
        $project: {
          name: 1,
        },
      },
      { $sample: { size: 3 } },
    ]);
    res.status(200).json({
      status: "success",
      categories,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "categories couldnt be fetched for homepage" });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Product.aggregate([{ $sample: { size: 8 } }]);
    res.status(200).json({
      status: "success",
      products: products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Product 8 for homepage failed" });
  }
});

module.exports = router;
