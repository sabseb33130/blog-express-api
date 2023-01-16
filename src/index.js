// imports
const express = require("express");
require("dotenv").config(); // permet de cacher les donnée dans un autrs fichier .env

const usersRouter = require("./routes/usersRouter");
const app = express();
const port = 8000;

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000 ");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});
//activation bodyparse pour JSON
//app.use("/api/articles", articlesControllers);
app.use("/api/users", usersRouter);
app.all("*", function (req, res) {
  res.status(404).end("not found");
});
// ecoute le port 8000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
