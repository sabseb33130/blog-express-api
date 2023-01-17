const client = require("../client");

class CommentairesServices {
    async getAllCommentaires() {
        const data = await client.query("SELECT * FROM commentaire");

        if (data.rowCount) {
            return data.rows;
        }

        return undefined;
    }

    async getCommentaireById(id) {
        const data = await client.query("SELECT * FROM commentaire WHERE id=$1", [id]);

        if (data.rowCount) {
            return data.rows[0];
        }

        return undefined;
    }

    async postCommentaire(commentaire) {
        const data = await client.query(
            "INSERT INTO commentaire (commentaire) VALUES ($1) returning *",
            [commentaire]
        );

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
