const { ExtractJwt, Strategy } = require("passport-jwt");
const passport = require("passport");
const UserService = require("../users/service");
const AuthService = require("./service");

const authService = new AuthService();
const userService = new UserService(authService);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const { sub } = payload;
      const user = await userService.findById(sub);
      if (user) return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);
