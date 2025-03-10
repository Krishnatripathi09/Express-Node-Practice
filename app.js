const express = require("express");
const dbConnect = require("./config/database");
const User = require("./models/user");
const { authRouter } = require("./routes/auth");
const { userRouter } = require("./routes/user");
const { requestRouter } = require("./routes/request");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 7777;

app.use(express.json());
app.use(cookieParser());

dbConnect()
  .then(() => {
    console.log("Connected to DataBase Successfully");
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(" I am listening on PORT 7777,Yell Harder");
    });
  })
  .catch((err) => {
    console.log("Error Bha Gail :", err);
  });

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", requestRouter);
