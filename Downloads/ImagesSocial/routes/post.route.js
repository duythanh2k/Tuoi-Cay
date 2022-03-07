const express = require("express");
const router  = express.Router();

const authenMiddleware = require("../Middleware/authen.middleware");
const posts   = require("../controllers/post.controller");

router.get("/:id/comments", authenMiddleware.isAuth, posts.getAllDesc);
router.delete("/:id/comments/:comment_id", authenMiddleware.isAuth, posts.deleteComment);

module.exports = router;