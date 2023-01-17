const bcrypt = require("bcrypt");
const client = require("../client");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const UsersServices = require("../services/usersServices");

const accessTokenSecret = process.env.ACCESTOKENSECRET;

const usersServices = new UsersServices();

class UsersControllers {
  async login(req, res) {
    const name = req.body.name;
    const password = req.body.password;
    try {
      const user = await usersServices.getUserByName(name);
      const id = user.id;

      if (user) {
        bcrypt.compare(password, user.password, async function (err, result) {
          if (result == true) {
            const accessToken = jwt.sign(id, accessTokenSecret);

            res.status(200).json({
              status: "OK",
              data: accessToken,
              message: "logged in",
            });
          } else {
            res.status(403).json({
              status: "fail",
              message: "mot de passe incorrect",
              data: null,
            });
          }
        });
      } else {
        res.status(404).json({
          status: "fail",
          message: "identifiant incorrect",
          data: null,
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: "erreur serveur",
      });
      console.log(err.stack);
    }
  }

  async register(req, res) {
    const name = req.body.name;
    const password = req.body.password;

    bcrypt.hash(password, 10, async function (err, hash) {
      try {
        const data = await usersServices.addUser(name, hash);

        res.status(201).json({
          status: "success",
          message: "register success",
          data: data,
        });
      } catch (err) {
        res.status(500).json({
          status: "fail",
          message: "erreur serveur",
        });
        console.log(err.stack);
      }
    });
  }
}

module.exports = UsersControllers;
