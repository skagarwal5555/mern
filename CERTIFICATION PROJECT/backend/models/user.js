const mongoose = require("mongoose");

const user_schema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: String,
    password: {
      type: String,
      required: true,
    },
    email: { type: String, unique: true, required: true },
    phone: String,
    isAdmin: { type: Boolean, default: false },
    interests: String,
    profileImage: String,
    address: {
      streetAddress: String,
      city: String,
      state: String,
      zipCode: String,
    },
    createdOn: {
      type: Date,
      default: Date.now(),
    },
    updatedOn: {
      type: Date,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("User", user_schema);
