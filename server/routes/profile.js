var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");

const Profile = require("../models/Profile");
const User = require("../models/User");

const authUser = require("../middlewares/authUser");
/**
 * POST /profile {profile}
 */
router.post(
  "/",
  [
    authUser,
    [
      body("userName").notEmpty(),
      body("firstName").notEmpty(),
      body("bio").notEmpty(),
      body("company").notEmpty(),
      body("availForHire").notEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json(errors.array());
    }
    try {
      const userData = await User.findOne({ userName: req.body.userName });
      if (!userData) {
        return res.status(401).json({ Error: "User Does not Exists" });
      }

      let profileData = await Profile.findOne({
        userName: req.body.userName
      });
      if (profileData) {
        return res.status(401).json({ Error: "Profile Already Exists" });
      }

      profileData = new Profile(req.body);

      let validFlag = true;
      if (profileData.lastName && typeof profileData.lastName !== "string")
        validFlag = false;
      if (
        profileData.alternateEmail &&
        typeof profileData.alternateEmail !== "string"
      )
        validFlag = false;
      if (profileData.imgUrl && typeof profileData.imgUrl !== "string")
        validFlag = false;
      if (profileData.location && typeof profileData.location !== "string")
        validFlag = false;
      if (
        profileData.publicEmail &&
        typeof profileData.publicEmail !== "string"
      )
        validFlag = false;
      if (profileData.mobile && typeof profileData.mobile !== "string")
        validFlag = false;

      if (profileData.websiteUrl && typeof profileData.websiteUrl !== "string")
        validFlag = false;
      if (
        profileData.availForHire &&
        typeof profileData.availForHire !== "boolean"
      )
        validFlag = false;

      if (
        req.body.techStack &&
        !(req.body.techStack instanceof Array && req.body.techStack.length)
      )
        validFlag = false;

      if (profileData.emojiUrl && typeof profileData.emojiUrl !== "string")
        validFlag = false;

      if (
        req.body.blogs &&
        !(req.body.blogs instanceof Array && req.body.blogs.length)
      )
        validFlag = false;

      if (
        req.body.achievements &&
        !(
          req.body.achievements instanceof Array && req.body.achievements.length
        )
      )
        validFlag = false;

      if (profileData.social && !(profileData.social instanceof Array))
        validFlag = false;

      if (profileData.projects && !(profileData.projects instanceof Array))
        validFlag = false;

      if (!validFlag) {
        return res.status(401).json({ Error: "Validation Failed" });
      }
      profileData.save();
      userData.profile = profileData._id;
      userData.save();
      res.status(200).json({ Success: "User Profile Created Successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ Error: "Error while processing the request" });
    }
  }
);

/**
 * GET /profile/:userName
 */
router.get("/:userName", [authUser], async (req, res) => {
  try {
    if (!req.params.userName) {
      return res.status(401).json({ Error: "User Name not Passed" });
    }
    const profileData = await Profile.findOne({
      userName: req.params.userName
    });
    if (!profileData) {
      return res.status(401).json({ Error: "No User Profile Found" });
    }
    res.status(200).json(profileData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "Unable to Process the Request" });
  }
});

/**
 * PUT /profile/:userName
 */
router.put("/", [authUser], async (req, res) => {
  try {
    const userData = await User.findOne({ userName: req.body.userName });
    if (!userData) {
      return res.status(401).json({ Error: "User Does not Exists" });
    }

    let profileData = await Profile.findOne({
      userName: req.body.userName
    });
    if (!profileData) {
      return res.status(401).json({ Error: "Profile does not Exists" });
    }

    let validFlag = true;
    let reqData = req.body;

    if (reqData.firstName && typeof reqData.firstName !== "string")
      validFlag = false;
    else
      profileData.firstname = reqData.firstName
        ? reqData.firstName
        : profileData.firstname;

    if (reqData.lastName && typeof reqData.lastName !== "string")
      validFlag = false;
    else
      profileData.lastName = reqData.lastName
        ? reqData.lastName
        : profileData.lastName;

    if (reqData.alternateEmail && typeof reqData.alternateEmail !== "string")
      validFlag = false;
    else
      profileData.alternateEmail = reqData.alternateEmail
        ? reqData.alternateEmail
        : profileData.alternateEmail;

    if (reqData.imgUrl && typeof reqData.imgUrl !== "string") validFlag = false;
    else
      profileData.imgUrl = reqData.imgUrl ? reqData.imgUrl : profileData.imgUrl;

    if (reqData.location && typeof reqData.location !== "string")
      validFlag = false;
    else
      profileData.location = reqData.location
        ? reqData.location
        : profileData.location;

    if (reqData.publicEmail && typeof reqData.publicEmail !== "string")
      validFlag = false;
    else
      profileData.publicEmail = reqData.publicEmail
        ? reqData.publicEmail
        : profileData.publicEmail;

    if (reqData.mobile && typeof reqData.mobile !== "string") validFlag = false;
    else
      profileData.mobile = reqData.mobile ? reqData.mobile : profileData.mobile;

    if (reqData.techStack && !(reqData.techStack instanceof Array))
      validFlag = false;
    else
      profileData.techStack = reqData.techStack
        ? reqData.techStack
        : profileData.techStack;

    if (reqData.websiteUrl && typeof reqData.websiteUrl !== "string")
      validFlag = false;
    else
      profileData.websiteUrl = reqData.websiteUrl
        ? reqData.websiteUrl
        : profileData.websiteUrl;

    if (reqData.availForHire && typeof reqData.availForHire !== "boolean")
      validFlag = false;
    else
      profileData.availForHire = reqData.availForHire
        ? reqData.availForHire
        : profileData.availForHire;

    if (reqData.emojiUrl && typeof reqData.emojiUrl !== "string")
      validFlag = false;
    else
      profileData.emojiUrl = reqData.emojiUrl
        ? reqData.emojiUrl
        : profileData.emojiUrl;

    if (reqData.blogs && !(reqData.blogs instanceof Array)) validFlag = false;
    else profileData.blogs = reqData.blogs ? reqData.blogs : profileData.blogs;

    if (reqData.achievements && !(reqData.achievements instanceof Array))
      validFlag = false;
    else
      profileData.achievements = reqData.achievements
        ? reqData.achievements
        : profileData.achievements;

    if (reqData.social && !(reqData.social instanceof Array)) validFlag = false;
    else
      profileData.social = reqData.social ? reqData.social : profileData.social;

    if (reqData.projects && !(reqData.projects instanceof Array))
      validFlag = false;
    else
      profileData.projects = reqData.projects
        ? reqData.projects
        : profileData.projects;

    if (!validFlag) {
      return res.status(401).json({ Error: "Validation Failed" });
    }
    profileData.save();
    res.status(200).json({ Success: "User Profile Updated Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "Unable to Process the Request" });
  }
});
module.exports = router;
