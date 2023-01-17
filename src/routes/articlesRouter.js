const ArticleController = require("../controllers/articlesControllers");
const express = require("express");
const authenticateJWT = require("../../middleware/auth");
const articleController = new ArticleController();

const articleRouter = express.Router();

articleRouter.get("/", authenticateJWT, (req, res) =>
  articleController.getAllArticle(req, res)
);
articleRouter.get("/:id", authenticateJWT, (req, res) =>
  articleController.getArticleById(req, res)
);
articleRouter.post("/", authenticateJWT, (req, res) =>
  articleController.postArticle(req, res)
);
articleRouter.put("/:id", authenticateJWT, (req, res) =>
  articleController.updateArticle(req, res)
);
articleRouter.delete("/:id", authenticateJWT, (req, res) =>
  articleController.deleteArticleById(req, res)
);

module.exports = articleRouter;
