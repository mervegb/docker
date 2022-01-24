const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("<h2>hello mero!!!</h2>");
});

app.listen(process.env.PORT || 5000, () => console.log("Listening to port"));
