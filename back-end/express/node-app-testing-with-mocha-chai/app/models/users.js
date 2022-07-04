let mongoose = require("mongoose");
let Schema = mongoose.Schema;

//user schema definition
let userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    address1: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

// Sets the createdAt parameter equal to the current time
userSchema.pre("save", (next) => {
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//Exports the user schema for use elsewhere.
module.exports = mongoose.model("users", userSchema);
