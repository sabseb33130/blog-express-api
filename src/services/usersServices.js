const Client = require("../client");
require("dotenv").config();
class UsersServices {
  /**
   * Methode qui appelle la requête Sql de la récupération d'un utilisateur par son nom
   * @param {string} name 
   * @returns 
   */
  async getUserByName(name) {
    const data = await Client.query("SELECT * FROM users WHERE name=$1", [
      name,
    ]);

    if (data.rowCount == 1) {
      return data.rows[0];
    }

    return undefined;
  }
/**
 * Methode qui appelle la requête Sql de l'ajout d'un utilisteur avec son nom et un mot de passe codé
 * @param {string} name 
 * @param {string} hash 
 * @returns 
 */
  async addUser(name, hash) {
    const data = await Client.query(
      "INSERT INTO users (name,password) VALUES ($1,$2) RETURNING *",
      [name, hash]
    );

    if (data.rowCount) {
      return data.rows[0];
    }

    return undefined;
  }
}

module.exports = UsersServices;
