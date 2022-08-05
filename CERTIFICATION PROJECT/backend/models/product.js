const mongoose = require("mongoose");
const Category = require("./category");

const product_schema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: Category },
    discountPrice: Number,
    productImage: String,
    description: String,
    isTopProduct: { type: Boolean, default: false },
    createdOn: {
      type: Date,
      default: Date.now(),
    },
    updatedOn: Date,
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Product", product_schema);
