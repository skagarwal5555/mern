const mongoose = require("mongoose");

const category_schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Category", category_schema);
