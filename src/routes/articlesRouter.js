import ArticleController from "../controllers/articlesControllers";

const ArticleController = new ArticleController();

articleRouter.get('/article', (req, res) => ArticleController.getAllArticle(req, res))
articleRouter.get('/article/:id', (req, res) => ArticleController.getArticleById(req, res))
articleRouter.post('/article', (req, res) => ArticleController.postArticle(req, res))



module.exports = articleRouter;