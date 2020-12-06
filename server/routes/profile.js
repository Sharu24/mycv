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

      const profileData = await Profile.findOne({
        userName: req.body.userName
      });
      if (!userData) {
        return res.status(401).json({ Error: "Profile Already Exists" });
      }

      profileData = new Profile(req.body);
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
module.exports = router;
