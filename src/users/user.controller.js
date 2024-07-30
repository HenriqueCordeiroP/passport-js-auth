const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const router = express.Router();

// TODO create user service
router
  .route("/")
  .get(async (req, res) => {
    const users = await User.findAll();
    res.status(200).json(users);
  })
  .post(async (req, res) => {
    try {
      const { name, password } = req.body;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const userData = { username: name, password: hashedPassword };

      const user = await User.create(userData);
      res.status(201).json(plainToInstance(UserResponseDto, user));
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
      throw err;
    }
  });

// TODO create Auth module
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = User.find({ where: { username } });
    if (!user) {
      res.status(404).send({ message: `User ${username} not found` });
      return;
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (isPasswordMatching) {
      res.status(201).json({ accessToken: `120987321893`, refreshToken: `312089390128` });
      return;
    }

    res.status(401).json({ message: "Passwords don't match" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
