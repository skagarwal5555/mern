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
      type: {
        streetAddress: String,
        city: String,
        state: String,
        zipCode: String,
      },
      default: {
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
      },
    },
  },
  { versionKey: false, timestamps: true }
);

const address = {
  streetAddress: String,
  city: String,
  state: String,
  zipCode: String,
};

module.exports = mongoose.model("User", user_schema);
