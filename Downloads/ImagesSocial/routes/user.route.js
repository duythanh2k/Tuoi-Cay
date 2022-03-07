const express = require("express");
const router  = express.Router();

const authenMiddleware = require("../Middleware/authen.middleware");
const users   = require("../controllers/user.controller");

router.post("/signup", users.signUp);
router.post("/signin", users.signIn);
router.get("/users/profile", authenMiddleware.isAuth, users.profile);
router.get("/signout", authenMiddleware.isAuth, users.signOut);

module.exports = router;
