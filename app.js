const express = require("express");

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server is listening on PORT 3000");
});

app.use("/hello", (req, res) => {
  res.send("Hello from /hello Route");
});

app.use("/", (req, res) => {
  res.send("Hello from Express");
});
