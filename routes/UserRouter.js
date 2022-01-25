const User = require("../models/UserModel");
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username: username, password: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    !user && res.status(404).json("User not found");

    const isCorrect = bcrypt.compare(password, user.password);
    if (isCorrect) {
      res.status(200).json(user);
    } else {
      res.status(401).json("Wrong credentials");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
