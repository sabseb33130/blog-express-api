const client = require("../client");
const CommentairesServices = require("../services/commentairesService");
require("dotenv").config();

const commentairesService = new CommentairesServices();
/**
 *  Class CommentaireController qui contient les methodes:
 * * getCommentaireById(req, res)
 * * postCommentaire(req, res)
 * * deleteCommentaireById(req, res)
 * * updateCommentaire(req, res)
 */
class CommentairesController {
  /**
   * Méthode qui affiche tous les commentaire d'un article par son id.
   * Gestion de l'état de la demande d'affichage.
   * @param {any} req
   * @param {any} res
   * @returns
   */
  async getCommentaireById(req, res) {
    const commentaire_articleId = req.params.id;

    if (Number.isNaN(Number(commentaire_articleId))) {
      res.status(404).json({
        status: "fail",
        message: "numéro d'ID de l'article nécessaire",
      });
      return;
    }
    const articleId = await client.query(
      "SELECT * FROM commentaire WHERE user_id_article=$1",
      [commentaire_articleId]
    );
    const articleOk = await client.query("SELECT * FROM article WHERE id=$1", [
      commentaire_articleId,
    ]);

    if (articleOk.rowCount === 0) {
      res.status(404).json({
        status: "Erreur",
        message: "Article inexistant",
      });
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
  /**
   * Méthode qui publie le commentaire d'un article.
   * Gestion de la demande de publication.
   * @param {any} req
   * @param {any} res
   * @returns
   */
  async postCommentaire(req, res) {
    const commentaire = req.body.text_commentaire;
    const user_id_article = req.params.id;
    const test = req.userId;

    if (Number.isNaN(Number(user_id_article))) {
      res.status(404).json({
        status: "fail",
        message: "numéro d'ID de l'article nécessaire",
      });
      return;
    }
    if (commentaire !== commentaire.toString()) {
      res.status(200).json({
        status: "Erreur",
        message: "Veuillez siasir un commentaire correspondant au format ",
      });
      return;
    }
    const articleOk = await client.query("SELECT * FROM article WHERE id=$1", [
      user_id_article,
    ]);

    if (articleOk.rowCount === 0) {
      res.status(404).json({
        status: "Erreur",
        message: "Article inexistant",
      });
      return;
    }

    if (test != articleOk.rows[0].user_id) {
      res.status(403).json({
        status: "Forbidden",
        message: "Vous n'êtes pas autorisé à ajouter un commentaire",
      });
      return;
    }

    try {
      const validated_commentaire = await commentairesService.postCommentaire(
        commentaire,
        user_id_article
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
  }
  /**
   * Méthode qui supprime un commentaire d'un article.
   * Gestion de l'état de la demande de suppression.
   * @param {any} req
   * @param {any} res
   * @returns
   */
  async deleteCommentaireById(req, res) {
    const deleteId = req.params.id;
    const test = req.userId;
    if (Number.isNaN(Number(deleteId))) {
      res.status(404).json({
        status: "fail",
        message: "numéro d'ID nécessaire",
      });
      return;
    }

    const commentaireOk = await client.query(
      "SELECT * FROM commentaire WHERE id_commentaire=$1",
      [deleteId]
    );
    if (commentaireOk.rowCount === 0) {
      res.status(404).json({
        status: "Erreur",
        message: "commentaire inexistant",
      });
      return;
    }
    if (test != commentaireOk.rows[0].user_id) {
      res.status(403).json({
        status: "Forbidden",
        message: "Vous n'êtes pas autorisé à supprimer ce commentaire",
      });
      return;
    }
    try {
      const deleted_com = await commentairesService.deleteCommentaire(deleteId);
      if (deleted_com !== undefined) {
        res.status(200).json({
          status: "success",
          message: "commentaire supprimé",
          data: deleted_com,
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: "erreur serveur",
      });
      console.log(err.stack);
    }
  }
  /**
   * Méthode qui modifie un commentaire d'un article.
   * Gestion de l'état de la demande de modification.
   * @param {any} req
   * @param {any} res
   * @returns
   */
  async updateCommentaire(req, res) {
    const updateId = req.params.id;
    const comUp = req.body.text_commentaire;
    const test = req.userId;
    if (Number.isNaN(Number(updateId))) {
      res.status(404).json({
        status: "fail",
        message: "numéro d'ID nécessaire",
      });
      return;
    }

    const commentaireOk = await client.query(
      "SELECT * FROM commentaire WHERE id_commentaire=$1",
      [updateId]
    );
    if (commentaireOk.rowCount === 0) {
      res.status(404).json({
        status: "Erreur",
        message: "commentaire inexistant",
      });
      return;
    }
    if (test != commentaireOk.rows[0].user_id) {
      res.status(403).json({
        status: "Forbidden",
        message: "Vous n'êtes pas autorisé à modifier ce commentaire",
      });
      return;
    }
    try {
      const update_com = await commentairesService.updateCommentaire(
        updateId,
        comUp
      );
      if (update_com !== undefined) {
        res.status(200).json({
          status: "success",
          message: "commentaire modifié",
          data: update_com,
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: "erreur serveur",
      });
      console.log(err.stack);
    }
  }
}

module.exports = CommentairesController;
