const mongoose = require("mongoose");
const Product = require("./product");

let ItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less then 1."],
    },
  },
  {
    timestamps: true,
  }
);

const cart_schema = new mongoose.Schema(
  {
    items: [ItemSchema],
    email: { type: String, required: true },
    isGuestUser: {
      type: Boolean,
      default: false,
    },
    isOrdered: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Cart", cart_schema);
