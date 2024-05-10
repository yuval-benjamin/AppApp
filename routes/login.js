const express = require("express");
const router = express.Router();

const loginController  = require("../controllers/login");

router.get("/", loginController.loginForm);
router.get("/signup", loginController.registerForm);
// router.post("/register", loginController.register);
router.get("/login", loginController.loginForm);
router.get("/test", loginController.loginForm);
// router.post("/login", loginController.login);
// router.get('/logout',loginController.logout);
// router.get('/', loginController.isLoggedIn, loginController.foo);


module.exports = router;
