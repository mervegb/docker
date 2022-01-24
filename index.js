const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config");

const app = express();
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
mongoose
  .connect(mongoUrl)
  .then(() => console.log("Connected to Database"))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("<h2>hello mero!!!</h2>");
});

app.listen(process.env.PORT || 5000, () => console.log("Listening to port"));
