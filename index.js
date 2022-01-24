const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://merve:mypassword@mongo:27017/?authSource=admin")
  .then(() => console.log("Connected to Database"))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("<h2>hello mero!!!</h2>");
});

app.listen(process.env.PORT || 5000, () => console.log("Listening to port"));
