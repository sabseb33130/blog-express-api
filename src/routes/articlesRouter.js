const ArticleController = require("../controllers/articlesControllers")
const express = require("express");
const articleController = new ArticleController();

const articleRouter = express.Router();

articleRouter.get('/', (req, res) => articleController.getAllArticle(req, res))
articleRouter.get('/:id', (req, res) => articleController.getArticleById(req, res))
articleRouter.post('/', (req, res) => articleController.postArticle(req, res))
articleRouter.put('/:id', (req, res) => articleController.updateArticle(req, res))
articleRouter.delete('/:id', (req, res) => articleController.deleteArticle(req, res))


module.exports = articleRouter;