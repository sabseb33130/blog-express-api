const CommentairesController = require("../controllers/commentairesControllers")
const express = require("express");
const commentaireController = new CommentairesController();

const commentairesRouter = express.Router();

commentairesRouter.get('/', (req, res) => commentaireController.getAllCommentaires(req, res))
commentairesRouter.get('/:id', (req, res) => commentaireController.getCommentaireById(req, res))
commentairesRouter.post('/', (req, res) => commentaireController.postCommentaire(req, res))
commentairesRouter.put('/:id', (req, res) => commentaireController.updateCommentaire(req, res))
commentairesRouter.delete('/:id', (req, res) => commentaireController.deleteCommentaireById(req, res))


module.exports = commentairesRouter;