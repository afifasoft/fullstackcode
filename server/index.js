const express = require("express");
const app = express();

// 11
app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

app.listen(5000);
