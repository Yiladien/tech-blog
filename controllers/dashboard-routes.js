const router = require("express").Router();
// const sequelize = require("../config/connection");
const { Post } = require("../models");
const withAuth = require("../utils/auth");

// get all posts for dashboard
router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("dashboard", { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Post.findByPk(req.params.id, {})
    .then((dbPostData) => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });

        res.render("edit-post", {
          post,
          loggedIn: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
