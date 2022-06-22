const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  items: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("user", UserSchema);
