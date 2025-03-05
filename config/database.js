const mongoose = require("mongoose");

const dbConnect = async () => {
  await mongoose.connect(
    "mongodb+srv://dbUser619:5lJkpWr4AlQlxxlE@cluster0.qgtn1.mongodb.net/newDataBase"
  );
};

module.exports = dbConnect;
