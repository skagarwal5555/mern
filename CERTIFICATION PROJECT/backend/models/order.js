const mongoose = require("mongoose");
const Cart = require("./cart");

const order_schema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    address: {
      streetAddress: String,
      city: String,
      state: String,
      zipCode: String,
    },
    isGuestUser: { type: Boolean, default: false },
    orderNumber: String,
    orderPlacedOn: {
      type: String,
      default: new Date().toLocaleString(),
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    orderDeliveredOn: Date,
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Order", order_schema);
