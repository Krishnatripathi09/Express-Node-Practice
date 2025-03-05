const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await data.save();

    res.send("User Data Saved SuccessFully");
  } catch (err) {
    res.status(400).send("Error Occured :", err);
  }
});

authRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(400).send("User Not Found Please Enter Valid Email");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      res.send("Log-In Successfull");
    } else {
      res.status(400).send("Invalid Password");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = { authRouter };
