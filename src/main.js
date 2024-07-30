const express = require("express");

const app = express();
app.use(express.json());

const userRouter = require("./users/user.controller");

app.use("/users", userRouter);

app.listen(3000);
console.log("Express App running on http://localhost:3000");

// TODO use typescript, ES2020
