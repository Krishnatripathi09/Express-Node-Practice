const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email 😎 Please Enter Valid One");
      }
    },


  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Please Make Your Password Strong 😡");
      }
    },
  },
});

UserSchema.methods.signJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "WebSecretToken@987");

  return token;
};

UserSchema.methods.verifyPWD = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isValidPassword = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isValidPassword;
};
const User = mongoose.model("User", UserSchema);

module.exports = User;
