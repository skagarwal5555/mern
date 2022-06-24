const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: mongoose.Types.Decimal128,
    required: true,
    default: 0,
    get: getCosts
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  id: false
}, {toJSON: {getters: true}});

function getCosts(value) {
  if (typeof value !== 'undefined') {
     return parseFloat(value.toString());
  }
  return value;
};

module.exports = mongoose.model("product", productSchema);
