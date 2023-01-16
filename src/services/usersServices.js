const Client = require("../client");
require("dotenv").config();
class UsersServices {
  async getUserByName(name) {
    const data = await Client.query("SELECT * FROM users WHERE name=$1", [
      name,
    ]);
    console.log(data);
    console.log(data.rowCount);
    if (data.rowCount == 1) {
      return data.rows[0];
    }

    return undefined;
  }

  async addUser(name, hash) {
    const data = await Client.query(
      "INSERT INTO users (name,password) VALUES ($1,$2) RETURNING *",
      [name, hash]
    );
    console.log(data.rowCount);
    if (data.rowCount) {
      return data.rows[0];
    }

    return undefined;
  }
}

module.exports = UsersServices;
