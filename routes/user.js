const express = require("express");
const userRouter = express.Router();
const { UserAuth } = require("../middlewares/auth");
const { validateProfileData } = require("../utils/validation");

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
module.exports = {
  userRouter,
};
