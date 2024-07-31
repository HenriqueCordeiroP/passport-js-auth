const jwt = require("jsonwebtoken");
require("dotenv").config();

class AuthService {
  generateTokenPair(user) {
    const accessToken = jwt.sign(
      {
        sub: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    );
    const refreshToken = jwt.sign(
      {
        sub: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
    );

    return { accessToken, refreshToken };
  }
}

module.exports = AuthService;
