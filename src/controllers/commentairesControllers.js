const client = require("../client");
const CommentairesServices = require("../services/commentairesService");
require("dotenv").config();

const commentairesService = new CommentairesServices();

class CommentairesController {

    async getCommentaireById(req, res) {
        const commentaire_articleId = req.params.id;
        
        if (Number.isNaN(Number(commentaire_articleId))) {
            res.status(404).json({
                status: "fail",
                message: "numéro d'ID de l'article nécessaire",
            })
            return;

        }
        const articleId = await client.query("SELECT * FROM commentaire WHERE user_id_article=$1", [
            commentaire_articleId,
        ]);
        const articleOk = await client.query("SELECT * FROM article WHERE id=$1", [
            commentaire_articleId,
        ]);
            
            if (articleOk.rowCount === 0) {
                res.status(404).json({
                    status: "Erreur",
                    message: "Article inexistant",
                })
                return;

            }


                if (articleId.rowCount === 0) {
                    res.status(400).json({
                        status: "Erreur",
                        message: "Pas de commentaire",
                    });

                } else {
                    try {
                        const id_commentaire = await commentairesService.getCommentaireById(
                            commentaire_articleId
                        );
                        res.status(200).json({
                            status: "success",
                            data: id_commentaire,
                        });
                    } catch (err) {
                        res.status(500).json({
                            status: "fail",
                            message: "erreur serveur",
                        });
                        console.log(err.stack);
                    }

                }
            }
        
    

    async postCommentaire(req, res) {
            const commentaire = req.body.commentaire;
            console.log(commentaire);
            if (commentaire != undefined) {
                console.log(commentaire);
                try {
                    const validated_commentaire = await commentairesService.postCommentaire(
                        commentaire
                    );
                    res.status(200).json({
                        status: "success",
                        message: "commentaire posté avec succés",
                        data: validated_commentaire,
                    });
                } catch (err) {
                    res.status(500).json({
                        status: "fail",
                        message: "erreur serveur",
                    });
                }
            } else {
                res.status(400).json({
                    status: "fail",
                    message: "commentaire ou id utilisateur obligatoire",
                });
            }
        }

    async deleteCommentaireById(req, res) {
            const deleteId = req.params.id;

            if (!Number.isNaN(Number(deleteId))) {
                try {
                    const deleted_com = await commentairesService.deleteCommentaire(
                        deleteId
                    );
                    if (deleted_com !== undefined) {
                        res.status(200).json({
                            status: "success",
                            message: "commentaire supprimé",
                            data: deleted_com,
                        });
                    } else {
                        res.status(404).json({
                            status: "fail",
                            message: "id ne correspond à aucun commentaire",
                        });
                    }
                } catch (err) {
                    res.status(500).json({
                        status: "fail",
                        message: "erreur serveur",
                    });
                    console.log(err.stack);
                }
            } else {
                res.status(404).json({
                    status: "fail",
                    message: "numéro d'ID nécessaire",
                });
            }
        }

    async updateCommentaire(req, res) {
            const updateId = Number(req.params.id);
            const updateCom = req.body.commentaire;
            //const test = req.userId;
            if (Number.isNaN(Number(updateId))) {
                res.status(404).json({
                    status: "FAIL",
                    message: "Nécessite un nombre valable en tant qu'Id",
                });
            } else {
                if (updateCom === undefined) {
                    res.status(404).json({
                        status: "FAIL",
                        message: "Aucun commentaire ne correspond à cet id",
                    });
                } else {
                    try {
                        /*const Data = await client.query(
                                      "SELECT id FROM article WHERE id=$1",
                                      [updateId]
                                      );
                                      if (test !== ticketData.rows[0]["userId"]) {
                                      res.status(404).json({
                                          status: "FAIL",
                                          message: "update non autorisée",
                                      });
                                      } else {*/
                        const upCom = await commentairesService.updateCommentaire(
                            updateId,
                            updateCom
                        );

                        if (upCom) {
                            res.status(201).json({
                                status: "success",
                                message: "données modifiées",
                                data: upCom,
                            });
                        } else {
                            res.status(400).json({
                                status: "FAIL",
                                message: "valeur manquante",
                            });
                        }

                        //   }
                    } catch (err) {
                        console.log(err);
                        res.status(500).json({
                            status: "FAIL",
                            message: "erreur serveur",
                        });
                    }
                }
            }
        }
    }

module.exports = CommentairesController;
