const ArticleController = require("../controllers/articlesControllers");
const express = require("express");
const authenticateJWT = require("../../middleware/auth");
const articleController = new ArticleController();

const articleRouter = express.Router();

/**
 * Différentes Routes pour les requettes sur les articles
 */
articleRouter.get("/", articleController.getAllArticle);
articleRouter.get("/:id", articleController.getArticleById);
articleRouter.post("/", authenticateJWT, articleController.postArticle);
articleRouter.put("/:id", authenticateJWT, articleController.updateArticle);
articleRouter.delete(
  "/:id",
  authenticateJWT,
  articleController.deleteArticleById
);

module.exports = articleRouter;
