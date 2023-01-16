// imports
const express = require("express");
require("dotenv").config(); // permet de cacher les donnée dans un autrs fichier .env
const bodyParser = require("body-parser");
const { Client } = require("pg");
const fs = require("fs");

// declarations
const app = express();
const port = 8000;
const client = new Client({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

client.connect();

//activation bodyparse pour JSON
app.use(bodyParser.json());

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ecoute le port 8000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
