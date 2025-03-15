const express = require("express");

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server is listening on PORT 3000");
});

app.get("/user", (req, res) => {
  res.send("Got all the Usera kilua");
});
