var express = require("express");
var router = express.Router();
const Product = require("../models/product");
const Categories = require("../models/category");

/* GET home page banner. */
router.get("/banner", async (req, res) => {
  try {
    var products = await Product.find({ isDeleted: false })
      .select({ name: 1, productImage: 1 })
      .sort({ createdAt: -1 });
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
    let categories = await Product.aggregate([
      { $match: { isDeleted: false } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $project: {
          _id: "$category._id",
          name: "$category.name",
        },
      },
      { $sample: { size: 5 } },
      //taking five to avoid empty categories for products that are deleted and no other product exist in that category
    ]);

    //this is to avoid dulicate
    categories = [
      ...new Map(categories.map((item) => [item["name"], item])).values(),
    ].slice(0, 3); //slice is to take only 3 elements for home page

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

router.get("/Allcategories", async (req, res) => {
  try {
    let categories = await Product.aggregate([
      { $match: { isDeleted: false } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $project: {
          _id: "$category._id",
          name: "$category.name",
        },
      },
    ]);

    categories = [
      ...new Map(categories.map((item) => [item["name"], item])).values(),
    ];

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
    var products = await Product.aggregate([
      { $match: { isDeleted: false } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      { $sample: { size: 8 } },
    ]);
    res.status(200).json({
      status: "success",
      products: products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Product 8 for homepage failed" });
  }
});

//get product details by Id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id, { id });
    const product = await Product.find({
      category: id,
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

module.exports = router;
