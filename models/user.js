const mongoose = require("mongoose");
const validator = require("validator");

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

    // validate(value) {
    //   if (!validator.isEmail(value)) {
    //     throw new Error("Please Enter Valid Email");
    //   }
    // },
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

const User = mongoose.model("User", UserSchema);

module.exports = User;
