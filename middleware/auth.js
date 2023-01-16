const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.ACCESTOKENSECRET;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, userId) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.userId = token.userId;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = authenticateJWT;
