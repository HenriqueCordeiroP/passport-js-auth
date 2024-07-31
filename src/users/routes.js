const express = require("express");
const UserService = require("./service");
const passport = require("passport");
require("../auth/passport.js");

const router = express.Router();
const userService = new UserService();

router.get("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.findById(id);
    if (!user) {
      res.status(404).send({ message: `User ${username} not found` });
      return;
    }

    const { password, ...userWithoutPassword } = user;

    res.status(200).json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
