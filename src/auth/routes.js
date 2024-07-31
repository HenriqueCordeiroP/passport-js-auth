const express = require("express");
const bcrypt = require("bcrypt");
const UserService = require("../users/service");
const AuthService = require("./service");

const router = express.Router();

const userService = new UserService();
const authService = new AuthService();

router.post("/sign-up", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userService.create(username, password);

    const { accessToken, refreshToken } = authService.generateTokenPair(user);
    res.status(201).json({ accessToken, refreshToken, id: user.id });
  } catch (err) {
    // TODO create exception filters
    if (err.message === "conflict") {
      res
        .status(409)
        .json({ statusCode: 409, message: "A user with this username already exists" });
      return;
    }
    res.status(500).json({ statusCode: 500, message: err.message });
    throw err;
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userService.findByUsername(username);
    if (!user) {
      res.status(404).send({ message: `User ${username} not found` });
      return;
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      res.status(401).json({ message: "Passwords don't match" });
      return;
    }

    const { accessToken, refreshToken } = authService.generateTokenPair(user);
    res.status(201).json({ accessToken, refreshToken, id: user.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
