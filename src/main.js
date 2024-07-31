const express = require("express");
const passport = require("passport");
require("./auth/passport.js");

const app = express();
app.use(express.json());

const userRouter = require("./users/routes");
const authRouter = require("./auth/routes");

app.use("/api/v1/auth/", authRouter);

// app.use(passport.authenticate("jwt", { session: false }));
app.use("/api/v1/users/", userRouter);

app.listen(3000);
console.log("Express App running on http://localhost:3000");

// TODO use typescript, ES2020
