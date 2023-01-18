const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.ACCESTOKENSECRET;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  if (authHeader) {
    jwt.verify(token, accessTokenSecret, (err, decode) => {
      if (err) {
        return res.status(403).json({
          status: "FORBIDDEN",
          message: "Clé de sécurité utilisateur incorrecte",
        });
      }

      req.userId = decode.id;;
      next();
    });
  } else {
    res.sendStatus(401).json({
      status: "Fail",
      message: "Utilisateur inconnu",
    });
  }
};

module.exports = authenticateJWT;
