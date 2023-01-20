const client = require("../client");

class CommentairesServices {
  /**
   * Methode qui appelle la requête Sql de la récupération de l'enssemble des commentaires publiés
   * @returns 
   */
  async getAllCommentaires() {
    const data = await client.query("SELECT * FROM commentaire");

    if (data.rowCount) {
      return data.rows;
    }

    return undefined;
  }

  async getCommentaireById(user_id_article) {
    /* const data = await client.query(
      "SELECT * FROM commentaire WHERE user_id_article=$1",
      [user_id_article]
    );*/
    const data = await client.query(
      "select id_article,titre,article,text_commentaire,user_id_article from article join commentaire on (commentaire.user_id_article=$1) = (article.id=$1)",
      [user_id_article]
    );

    if (data.rowCount) {
      return data.rows;
    }

    return undefined;
  }
/**
 * Methode qui appelle la requête Sql de la récupération de l'ensemble des commentaires publiés d'un article par son id
 * @param {string} text_commentaire 
 * @param {number} user_id_article 
 * @returns 
 */
  async postCommentaire(text_commentaire, user_id_article) {
    const data = await client.query(
      "INSERT INTO commentaire (text_commentaire,user_id_article) VALUES ($1,$2) returning *",
      [text_commentaire, user_id_article]
    );

    if (data.rowCount) {
      return data.rows[0];
    }

    return undefined;
  }
/**
 * Methode qui appelle la requête Sql de la modification d'un commentaire par son id
 * @param {number} id 
 * @param {string} commentaire 
 * @returns 
 */
  async updateCommentaire(id, commentaire) {
    const data = await client.query(
      "UPDATE commentaire SET text_commentaire=$2 WHERE id_commentaire = $1 returning *",
      [id, commentaire]
    );
    if (data.rowCount) {
      return data.rows[0];
    }

    return undefined;
  }
/**
 * Methode qui appelle la requête Sql de la suppression d'un commentaire par l'id du commentaire
 * @param {number} id 
 * @returns 
 */
  async deleteCommentaire(id) {
    const data = await client.query(
      "DELETE FROM commentaire WHERE id_commentaire=$1 returning *",
      [id]
    );

    if (data.rowCount) {
      return data.rows[0];
    }

    return undefined;
  }
}

module.exports = CommentairesServices;
