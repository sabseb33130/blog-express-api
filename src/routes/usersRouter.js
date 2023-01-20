const express = require("express");
const authenticateJWT = require("../../middleware/auth");
const UsersControllers = require("../controllers/usersControllers");

const usersRouter = express.Router();

const usersControllers = new UsersControllers();

/**
 * Différentes Route pour les requettes users
 */
usersRouter.post("/register", usersControllers.register);
usersRouter.post("/login", usersControllers.login);

module.exports = usersRouter;
