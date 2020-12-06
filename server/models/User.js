const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  termsAndConditions: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  token: { type: String },
  profile: { type: Schema.Types.ObjectId, ref: "Profile" }
});

module.exports = mongoose.model("User", userSchema, "users");
