const express = require("express");

const app = express();

const adminAuth = (req, res, next) => {
  console.log("Admin Auth is Getting Checked");

  const token = "ABC";

  const isAdminAuthorized = token === "ABC";
  if (!isAdminAuthorized) {
    res.status(401).send("Un-Authorized");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
};
