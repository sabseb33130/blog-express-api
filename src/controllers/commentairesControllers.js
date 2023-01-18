const client = require("../client");
const CommentairesServices = require("../services/commentairesService");
require("dotenv").config();

const commentairesService = new CommentairesServices();

class CommentairesController {
    async getAllCommentaires(req, res) {
        try {
            const com = await commentairesService.getAllCommentaires();

            res.status(200).json({
                status: "success",
                data: com,
            });
        } catch (err) {
            res.status(500).json({
                status: "fail",
                message: "erreur serveur",
            });
            console.log(err.stack);
        }
    }

    async getCommentaireById(req, res) {
        const commentaireId = req.params.id;

        if (!Number.isNaN(Number(commentaireId))) {
            try {
                const id_commentaire = await commentairesService.getCommentaireById(commentaireId);

                if (commentaireId >= 1) {
                    res.status(200).json({
                        status: "success",
                        data: id_commentaire,
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

    async postCommentaire(req, res) {
        const commentaire = req.body.commentaire;
        const user_id = req.userId;
        console.log(user_id)
        if (commentaire != null && user_id != null) {
            try {
                const validated_commentaire = await commentairesService.postCommentaire(user_id, commentaire);
                res.status(200).json({
                    status: "success",
                    message: "commentaire posté avec succés",
                    data: validated_commentaire,
                });
            } catch (err) {;
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
                    const deleted_com = await commentairesService.deleteCommentaire(deleteId);
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
                }
                catch (err) {
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
                if (
                    updateCom === undefined
                ) {
                    res.status(404).json({
                        status: "FAIL",
                        message: "Aucun commentaire ne correspond à cet id",
                    });
                } else {
                    try {

                        const upCom = await commentairesService.updateCommentaire(
                            updateId,
                            updateCom,
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
