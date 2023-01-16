const client = require('../client');

class ArticleService {
async getAllArticle(){
    const data = await client.query('SELECT * FROM article');

    console.log(data.rows);
    if (data.rowCount) {
        return data.rows[0];
    }

    return undefined
}

async getArticleById (id){
    const data = await client.query('SELECT * FROM article WHERE id=$1', [id]);

    console.log(data.rows, id);
    if (data.rowCount) {
        return data.rows[0];
    }

    return undefined
}

async postArticle (titre, article, user_id){
    const data = await client.query('INSERT INTO ticket (titre, article, user_id) VALUES ($1,$2,$3) returning *', [titre, article, user_id]);
    console.log(data.rows, id);
    if (data.rowCount) {
        return data.rows[0];
    }

    return undefined
}
}

module.exports = ArticleService