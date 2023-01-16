const client = require('../client');
const ArticleServices = require('../services/articlesServices');
require('dotenv').config();

const articleService = new ArticleServices()

class ArticleController {
    async getAllArticle(req, res) {
        try {
            const art = await articleService.getAllArticle();
            console.log(art.rowCount);

            res.status(200).json(
                {
                    status: "success",
                    data: art.rows
                }
            )
        }
        catch (err) {
            res.status(500).json(
                {
                    status: "fail",
                    message: "erreur serveur"
                }
            )
            console.log(err.stack)
        }
    }

    async getArticleById(req, res) {
        const articleId = req.params.id

        if (!Number.isNaN(Number(articleId))) {
            try {
                const id_article = await articleService.getArticleById(articleId);
                if (id_article.rows.length === 1) {
                    res.status(200).json(
                        {
                            status: "success",
                            data: id_article.rows[0]
                        }
                    )
                }
                else {
                    res.status(404).json(
                        {
                            status: "fail",
                            message: "id ne correspond à aucun ticket"
                        }
                    )
                }
            }
            catch (err) {
                res.status(500).json(
                    {
                        status: "fail",
                        message: "erreur serveur"
                    }
                )
                console.log(err.stack)
            }
        }
        else {
            res.status(404).json(
                {
                    status: "fail",
                    message: "numéro d'ID nécessaire"
                }
            )
        }
    }

    async postArticle(req, res) {

        console.log(req.body);


        if (titre && article != null) {
            try {

                const validated_article = await articleService.postArticle(titre, article);
                res.status(200).json(
                    {
                        status: "success",
                        message: "article posté avec succés",
                        data: validated_article.rows[0]
                    }
                )
            }
            catch (err) {
                res.status(500).json(
                    {
                        status: "fail",
                        message: "erreur serveur"
                    }
                )
                console.log(err);
            }
        }
        else {
            res.status(400).json(
                {
                    status: "fail",
                    message: "article, titre ou id utilisateur obligatoire"
                }
            )
        }
    }

    async deleteArticleById(req, res) {
        const deleteId = req.params.id
        const test = req.userId

        if (!Number.isNaN(Number(deleteId))) {
            try {
                const articleData = await client.query('SELECT id,user_id FROM article WHERE id=$1', [deleteId]);
                if (test !== articleData.rows[0]['userId']) {
                    res.status(404).json(
                        {
                            status: "FAIL",
                            message: "suppression non autorisée"
                        }
                    )

                }
                else {
                    const deleted_art = await articleService.deleteArticle(id);

                    if (deleted_art.rowCount === 1) {
                        res.status(200).json(
                            {
                                status: "success",
                                message: "article supprimé"
                            }
                        )
                    }

                    else {
                        res.status(404).json(
                            {
                                status: "fail",
                                message: "id ne correspond à aucun article"
                            }
                        )
                    }
                }
            }
            catch (err) {
                res.status(500).json(
                    {
                        status: "fail",
                        message: "erreur serveur"
                    }
                )
                console.log(err.stack);
            }
        }
        else {
            res.status(404).json(
                {
                    status: "fail",
                    message: "numéro d'ID nécessaire"
                }
            )
        }


    }

    async updateArticle(req, res) {
        const updateId = req.params.id
        const updateArt = req.body.article
        const updateArch = req.body.archiver
        const updateTitre = req.body.titre
        const test = req.userId

        if (!Number.isNaN(Number(updateId))) {
            if (updateArt && updateTitre && updateArch !== undefined) {
                if (updateArch === true || updateArch === false) {

                    try {
                        const ticketData = await client.query('SELECT id,user_id FROM ticket WHERE id=$1', [updateId]);
                        if (test !== ticketData.rows[0]['userId']) {
                            res.status(404).json(
                                {
                                    status: "FAIL",
                                    message: "update non autorisée"
                                }
                            )

                        }
                        else {
                            const upArt = await articleService.updateArticle(titre, article, archiver);

                            if (upArt.rowCount > 0) {
                                res.status(201).json({
                                    status: "success", message: "données modifiées", data: upArt.rows[0]
                                })
                            }
                            else {
                                res.status(404).json(
                                    {
                                        status: "FAIL",
                                        message: "Aucun article ne correspond à cet id"
                                    }
                                )
                            }
                        }
                    }
                    catch (err) {

                        res.status(500).json(
                            {
                                status: "FAIL",
                                message: "erreur serveur"
                            })
                    }
                } else {
                    res.status(400).json(
                        {
                            status: "FAIL",
                            message: "Booléen attendu"
                        }
                    )
                }
            } else {
                res.status(400).json(
                    {
                        status: "FAIL",
                        message: "valeur manquante"
                    }
                )
            };

        } else {
            res.status(404).json(
                {
                    status: "FAIL",
                    message: "Nécessite un nombre valable en tant qu'Id"
                });
        };
    }

}

module.exports = ArticleController;




