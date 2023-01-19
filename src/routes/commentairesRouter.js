const CommentairesController = require("../controllers/commentairesControllers");
const express = require("express");
const commentaireController = new CommentairesController();
const authenticateJWT = require("../../middleware/auth");

const commentairesRouter = express.Router();

commentairesRouter.get("/:id", commentaireController.getCommentaireById);
commentairesRouter.post(
  "/:id",
  authenticateJWT,
  commentaireController.postCommentaire
);
commentairesRouter.put(
  "/:id",
  authenticateJWT,
  commentaireController.updateCommentaire
);
commentairesRouter.delete(
  "/:id",
  authenticateJWT,
  commentaireController.deleteCommentaireById
);

module.exports = commentairesRouter;
