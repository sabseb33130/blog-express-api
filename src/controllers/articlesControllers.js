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
          message: "get id erreur serveur",
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
    //const user_id = req.body.user_id;
    const titre = req.body.titre;
    const article = req.body.article;
    const user_id = req.userId;

    if (titre !== null && article !== null) {
      try {
        const validated_article = await articleService.postArticle(
          user_id,
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
          message: "erreur serveur post",
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
    const deleted_art = await articleService.deleteArticle(deleteId);
    const articleData = await client.query(
      "SELECT id,user_id FROM article WHERE id=$1",
      [deleteId]
    );

    if (articleData || test === undefined) {
      res.status(200).json({
        status: "success",
        message: "article  supprimé",
        data: deleted_art,
      });
    } else if (test !== articleData.rows[0].user_id) {
      res.status(404).json({
        status: "FAIL",
        message: "suppression non autorisée",
      });
    } else {
      if (!Number.isNaN(Number(deleteId))) {
        try {
          if (deleted_art.id !== undefined) {
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
  }
  async updateArticle(req, res) {
    const test = req.userId;
    const updateId = req.params.id;
    const updateArt = req.body.article;
    const updateArch = req.body.archiver;
    const updateTitre = req.body.titre;

    const data = await client.query("SELECT * FROM article WHERE id=$1", [
      updateId,
    ]);
    //console.log(Data);
    if (test !== data.rows[0].user_id) {
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
              message: "Donnée reçu incorrect",
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
