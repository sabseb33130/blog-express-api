const express = require("express");
const authenticateJWT = require("../../middleware/auth");
const UsersControllers = require("../controllers/usersControllers");

const accessTokenSecret = process.env.ACCESTOKENSECRET;

const usersRouter = express.Router();

const usersControllers = new UsersControllers();

usersRouter.post("/register", usersControllers.register);
usersRouter.post("/login", (req, res) => usersControllers.login(req, res));

module.exports = usersRouter;
