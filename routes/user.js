const express = require("express");
const userRouter = express.Router();
const { UserAuth, PasswordAuth } = require("../middlewares/auth");
const { validateProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");

const app = express();

userRouter.get("/user", UserAuth, (req, res) => {
  const user = req.user;

  res.status(201).send("Logged In User is :" + user);
});

userRouter.patch("/user/edit", UserAuth, async (req, res) => {
  try {
    if (!validateProfileData(req)) {
      res.status(400).send("Edit not Allowed on this Field");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();
    res.json({ message: `${loggedInUser.firstName}`, data: loggedInUser });
  } catch (err) {
    res.status(500).send("Something Went Wrong !");
  }
});

userRouter.patch("/user/updatepassword", PasswordAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    loggedInUser = req.user;
    if (!oldPassword || !newPassword) {
      res.status(404).send("Both old and New Passwords are Required");
    }

    const isMatch = await bcrypt.compare(oldPassword, loggedInUser.password);
    if (!isMatch) {
      res.status(400).send("Old Password is Incorrect");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    loggedInUser.password = hashedPassword;
    await loggedInUser.save();

    res.status(200).send("Password Updated SuccessFully");
  } catch (err) {
    res.status(500).send("Something Went Wrong !" + err);
  }
});

module.exports = {
  userRouter,
};
