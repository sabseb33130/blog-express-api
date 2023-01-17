const client = require("../client");

class ArticleServices {
  async getAllArticle() {
    const data = await client.query("SELECT * FROM article");
    console.log(data);
    console.log(data.rows);
    if (data.rowCount) {
      return data.rows;
    }

    return undefined;
  }

  async getArticleById(id) {
    const data = await client.query("SELECT * FROM article WHERE id=$1", [id]);

    console.log(data.rows, id);
    if (data.rowCount) {
      return data.rows[0];
    }

    return undefined;
  }

  async postArticle(titre, article) {
    const data = await client.query(
      "INSERT INTO article (titre, article) VALUES ($1,$2) returning *",
      [titre, article]
    );
    console.log(data.rows);
    if (data.rowCount) {
      return data.rows[0];
    }

    return undefined;
  }

  async updateArticle(titre, article, archiver) {
    const data = await client.query(
      "UPDATE article SET (titre, article, archiver) VALUES ($1,$2,true) WHERE id = $1 returning *",
      [titre, article, archiver]
    );
    console.log(data.rows, id);
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
    console.log(data.rows, id);
    if (data.rowCount) {
      return data.rows[0];
    }

    return undefined;
  }
}

module.exports = ArticleServices;
