const bcrypt = require("bcrypt");
const { User } = require("../models");

class UserService {
  async create(username, password) {
    const existingUser = await this.findByUsername(username);
    if (existingUser) {
      throw new Error("conflict");
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = { username, password: hashedPassword };
    const user = await User.create(userData);
    // TODO create response dto
    const { password: _, ...userWithoutPassword } = user.dataValues;

    return userWithoutPassword;
  }

  async findByUsername(username) {
    return (await User.findOne({ where: { username } })).dataValues;
  }

  async findById(id) {
    return (await User.findOne({ where: { id } })).dataValues;
  }
}

module.exports = UserService;
