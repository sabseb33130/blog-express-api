const client = require("../client");
const ArticleServices = require("../services/articlesServices");
require("dotenv").config();

const articleService = new ArticleServices();

class ArticleController {
  async getAllArticle(req, res) {
    try {
      const art = await articleService.getAllArticle();

      res.status(200).json({
        status: "success",
        data: art,
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: "erreur serveur",
      });
      console.log(err.stack);
    }
  }

  async getArticleById(req, res) {
    const articleId = req.params.id;

    if (!Number.isNaN(Number(articleId))) {
      try {
        const id_article = await articleService.getArticleById(articleId);

        if (articleId >= 1) {
          res.status(200).json({
            status: "success",
            data: id_article,
          });
        } else {
          res.status(404).json({
            status: "fail",
            message: "id ne correspond à aucun article",
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

  async postArticle(req, res) {
    console.log(req.body);
    const titre = req.body.titre;
    const article = req.body.article;
    if (titre && article != null) {
      try {
        const validated_article = await articleService.postArticle(
          titre,
          article
        );
        res.status(200).json({
          status: "success",
          message: "article posté avec succés",
          data: validated_article,
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
        message: "article, titre ou id utilisateur obligatoire",
      });
    }
  }

  async deleteArticleById(req, res) {
    const deleteId = req.params.id;
    const test = req.userId;

    if (!Number.isNaN(Number(deleteId))) {
      try {
        const articleData = await client.query(
          "SELECT id,user_id FROM article WHERE id=$1",
          [deleteId]
        );
        console.log(articleData.rows[0]["userId"]);
        if (test !== articleData.rows[0]["userId"]) {
          res.status(404).json({
            status: "FAIL",
            message: "suppression non autorisée",
          });
        } else {
          const deleted_art = await articleService.deleteArticle(deleteId);

          if (deleted_art.id === undefined) {
            res.status(200).json({
              status: "success",
              message: "article supprimé",
              data: deleted_art,
            });
          } else {
            res.status(404).json({
              status: "fail",
              message: "id ne correspond à aucun article",
            });
          }
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

  async updateArticle(req, res) {
    const updateId = Number(req.params.id);
    const updateArt = req.body.article;
    const updateArch = req.body.archiver;
    const updateTitre = req.body.titre;
    const test = req.userId;
    const data = await client.query("SELECT * FROM article WHERE id=$1", [
      updateId,
    ]);

    if (test !== data.rows[0].user_id) {
      console.log(test);
      res.status(404).json({
        status: "FAIL",
        message: "update non autorisée",
      });
    } else {
      if (Number.isNaN(Number(updateId))) {
        res.status(404).json({
          status: "FAIL",
          message: "Nécessite un nombre valable en tant qu'Id",
        });
      } else {
        
        if (updateArch != true && updateArch != false) {
          res.status(400).json({ status: "FAIL", message: "Booléen attendu" });
        } else {
          if (
            updateArt === undefined ||
            updateTitre === undefined ||
            updateArch === undefined
          ) {
            res.status(404).json({
              status: "FAIL",
              message: "Aucun article ne correspond à cet id",
            });
          } else {
            try {
              const upArt = await articleService.updateArticle(
                updateId,
                updateTitre,
                updateArt,
                updateArch
              );

              if (upArt) {
                res.status(201).json({
                  status: "success",
                  message: "données modifiées",
                  data: upArt,
                });
              } else {
                res.status(400).json({
                  status: "FAIL",
                  message: "valeur manquante",
                });
              }
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
  }
}

module.exports = ArticleController;
