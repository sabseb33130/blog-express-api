const ArticleController = require("../controllers/articlesControllers");
const express = require("express");
const authenticateJWT = require("../../middleware/auth");
const articleController = new ArticleController();

const articleRouter = express.Router();

articleRouter.get("/", authenticateJWT,articleController.getAllArticle);
articleRouter.get("/:id", authenticateJWT,articleController.getArticleById);
articleRouter.post("/", authenticateJWT,articleController.postArticle);
articleRouter.put("/:id", authenticateJWT,articleController.updateArticle);
articleRouter.delete("/:id", authenticateJWT,articleController.deleteArticleById);

module.exports = articleRouter;
