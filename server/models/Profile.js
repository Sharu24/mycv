const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  userName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  alternateEmail: { type: String },
  imgUrl: { type: String }, // validate url
  bio: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  publicEmail: { type: String },
  mobile: { type: String },
  techStack: [],
  websiteUrl: { type: String },
  availForHire: { type: Boolean, required: true },
  emojiUrl: { type: String },
  social: [{ name: String, handle: String }],
  //[{ name:'facebook',handle:'goncha24'},
  //{ name:'github',handle:'goncha24'}]
  blogs: [],
  projects: [{ description: String, role: String, durationInMonths: Number }],
  achievements: [],
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Profile", profileSchema, "profiles");
