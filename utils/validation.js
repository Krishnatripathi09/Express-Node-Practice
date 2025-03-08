const validator = require("validator");

const validateSignUpData = (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("First and Last Name is Required");
  } else if (firstName.length < 5 || firstName.length > 50) {
    throw new Error("First Name length should be Between 5 and 50 Characters");
  } else if (lastName.length < 5 || lastName.length > 30) {
    throw new Error("Last Name shoudl be between 5 and 30 characters");
  } else if (!validator.isEmail(email)) {
    throw new Error("Please Enter valid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please Enter Strong Password");
  }
};

const validateProfileData = (req, res) => {
  const allowedEditFields = ["firstName", "lastName"];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};

module.exports = {
  validateSignUpData,
  validateProfileData,
};
