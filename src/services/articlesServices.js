const client = require("../client");

class ArticleServices {
  /**
   * Method qui appelle tout les articles postés et renvoi toutes les données de la table article*/
  async getAllArticle() {
    const data = await client.query("SELECT * FROM article");

    if (data.rowCount) {
      return data.rows;
    }
    return undefined;
  }
  /**
   *  *Method qui appelle la requête Sql de selection d'un article par id */
  async getArticleById(id) {
    const data = await client.query("SELECT * FROM article WHERE id=$1", [id]);

    if (data.rowCount) {
      return data.rows[0];
    }

    return undefined;
  }

  async postArticle(user_id, titre, article) {
    const data = await client.query(
      "INSERT INTO article (user_id,titre, article) VALUES ($1,$2,$3)  returning *",
      [user_id, titre, article]
    );

    if (data.rowCount) {
      return data.rows[0];
    }

    return undefined;
  }

  async updateArticle(id, titre, article, archiver) {
    const data = await client.query(
      "UPDATE article SET titre=$2, article=$3, archiver=$4 WHERE id = $1 returning *",
      [id, titre, article, archiver]
    );

    if (data.rowCount) {
      return data.rows[0];
    }

    return undefined;
  }

  async deleteArticle(id) {
    const data1 = await client.query(
      "delete from commentaire where user_id_article = $1 returning *",
      [id]
    );
    const data = await client.query(
      "DELETE FROM article WHERE id=$1 returning *",
      [id]
    );

    if (data.rowCount) {
      return data.rows[0], data1.rows[0];
    }

    return undefined;
  }
}

module.exports = ArticleServices;
