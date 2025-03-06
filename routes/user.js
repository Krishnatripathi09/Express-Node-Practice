const express = require("express");
const userRouter = express.Router();
const { UserAuth } = require("../middlewares/auth");

const app = express();

userRouter.get("/user", UserAuth, (req, res) => {
  const user = req.user;

  res.status(201).send("Logged In User is :" + user);
});

module.exports = {
  userRouter,
};
