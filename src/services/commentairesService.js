const client = require("../client");

class CommentairesServices {
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

  async postCommentaire(text_commentaire) {
    const data = await client.query(
      "INSERT INTO commentaire (text_commentaire) VALUES ($1) returning *",
      [text_commentaire]
    );
    console.log(data);
    if (data.rowCount) {
      return data.rows[0];
    }

    return undefined;
  }

  async updateCommentaire(id, commentaire) {
    const data = await client.query(
      "UPDATE commentaire SET commentaire=$2 WHERE id = $1 returning *",
      [id, commentaire]
    );
    if (data.rowCount) {
      return data.rows[0];
    }

    return undefined;
  }

  async deleteCommentaire(id) {
    const data = await client.query(
      "DELETE FROM commentaire WHERE id=$1 returning *",
      [id]
    );

    if (data.rowCount) {
      return data.rows[0];
    }

    return undefined;
  }
}

module.exports = CommentairesServices;
