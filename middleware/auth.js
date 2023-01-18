const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.ACCESTOKENSECRET;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  if (authHeader) {
    jwt.verify(token, accessTokenSecret, (err, decode) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.userId = decode;

      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = authenticateJWT;
