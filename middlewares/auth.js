const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const app = express();

const UserAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).send("Please Log-In Again");
    }

    const user = await jwt.verify(token, "WebSecretToken@987");
    const { _id } = user;

    const foundUser = await User.findById(_id).select(
      "firstName lastName password"
    ); //console.log(foundUser);
    if (!foundUser) {
      res.status(404).send("User Not Found ☹");
    }

    req.user = foundUser;
    next();
  } catch (err) {
    res.status(404).send("Error Occrured :" + err);
  }
};

const PasswordAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).send("Please Log-In Again");
    }

    const user = await jwt.verify(token, "WebSecretToken@987");
    const { _id } = user;

    const foundUser = await User.findById(_id).select(
      "firstName lastName password"
    ); //console.log(foundUser);
    if (!foundUser) {
      res.status(404).send("User Not Found ☹");
    }

    req.user = foundUser;
    next();
  } catch (err) {
    res.status(404).send("Error Occrured :" + err);
  }
};

module.exports = {
  UserAuth,
  PasswordAuth,
};
