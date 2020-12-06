const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { body, check, validationResult } = require("express-validator");
const User = require("../models/User");

/**
 * @POST
 * Post basic User Information
 */
router.post(
  "/",
  [
    check("userName")
      .notEmpty()
      .isString()
      .withMessage("User Name should be A String"),
    body("email", "Email is required").isEmail(),
    body("password")
      .isString()
      .isLength({ min: 6 })
      .withMessage("Password should be more than 6 characters"),
    body("termsAndConditions", "Terms and Conditions not checked").isBoolean()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let userData = await User.find({ userName: req.body.userName });
      if (userData.length) {
        return res.status(401).json({ Error: "User Already Exists" });
      }
      userData = new User(req.body);
      const saltRounds = 10;
      userData.password = await bcrypt.hash(req.body.password, saltRounds);

      await userData.save();
      res.status(200).json({ Success: "Created User Record Successfully" });

      // Generate a Token with jwt and randomString
      // Send and email to the user with Email Verification Link
    } catch (err) {
      console.error(err);
      res.status(500).json({ Error: "Unable to Process request" });
    }
  }
);

/**
 * @GET
 * Get a User's Basic Information
 */
router.get("/:user", async (req, res) => {
  try {
    if (!req.params.user) {
      return res.status(401).json({ Error: "User Name not Passed" });
    }
    const userData = await User.find({ userName: req.params.user });
    if (!userData.length) {
      return res.status(401).json({ Error: "User Name does not exists" });
    }
    res.status(200).json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "Unable to process the request" });
  }
});

/**
 * @POST
 * Login User
 * fields : Either userName or email is must with password
 */
router.post("/login", async (req, res) => {
  try {
    let userData = await User.find({
      $or: [{ userName: req.body.userName }, { email: req.body.email }]
    });
    if (!userData.length) {
      return res.status(401).json({ Error: "User does not exists" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData[0].password
    );
    if (!validPassword) {
      return res.status(401).json({ Error: "Invalid Credentials" });
    }

    //generate token

    res.status(200).json({ Success: "User logged In Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "Unable to Process request" });
  }
});

/**
 * @PUT
 * A secure link to update the password
 */
router.put("/", async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(401).json({ Error: "Password to Update is missing" });
    }

    const userData = await User.find({
      $or: [{ userName: req.body.userName }, { email: req.body.email }]
    });

    if (!userData.length) {
      return res.status(401).json({ Error: "Password to Update is missing" });
    }

    const saltRounds = 10;
    userData[0].password = await bcrypt.hash(req.body.password, saltRounds);

    userData[0].save();
    res.status(200).json({ Success: "Password was updated Successfully" });
  } catch (err) {
    console.error(err);
    res.status(200).json({ Error: "Unable to process the request" });
  }
});

/**
 * @GET
 * User
 * POST /user/verify/:token {isVerified, active}
 */
router.post("/verify/:token", async (req, res) => {
  try {
    res.status(200).json({ Success: "User Verified Successfully" });
  } catch (err) {
    console.error(err);
    res.status(200).json({ Error: "Unable to process the request" });
  }
});

/**
 * @GET
 * A secure link to Verify the user
 * POST /user/verify/:token {isVerified, active}
 */
router.get("/verify/:token", async (req, res) => {
  try {
    console.log(req.params.token);
    res.status(200).json({ Success: "User Verified Successfully" });
  } catch (err) {
    console.error(err);
    res.status(200).json({ Error: "Unable to process the request" });
  }
});

/**
 * @PUT
 * Remove Self from the the System
 * check token
 * */
router.put("/", async (req, res) => {
  try {
    let userData = await User.find({
      $or: [{ userName: req.body.userName }, { email: req.body.email }]
    });
    if (!userData.length) {
      return res.status(401).json({ Error: "User does not exists" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData[0].password
    );
    if (!validPassword) {
      return res.status(401).json({ Error: "Invalid Credentials" });
    }

    userData.isActive = false;

    await userData.save();

    res.status(200).json({ Success: "User Deactivated Successfully" });
  } catch (err) {
    console.error(err);
    res.status.send("Error Processing the request");
  }
});

module.exports = router;
