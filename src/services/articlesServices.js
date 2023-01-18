const client = require("../client");

class ArticleServices {
  async getAllArticle() {
    const data = await client.query("SELECT * FROM article");

    if (data.rowCount) {
      return data.rows;
    }

    return undefined;
  }

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
    const data = await client.query(
      "DELETE FROM article WHERE id=$1 returning *",
      [id]
    );
    // console.log(data);

    if (data.rowCount) {
      return data.rows[0];
    }

    return undefined;
  }
}

module.exports = ArticleServices;
