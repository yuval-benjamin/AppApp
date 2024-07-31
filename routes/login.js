const express = require("express");
const router = express.Router();

const loginController  = require("../controllers/login");

router.get('/', loginController.isLoggedIn, loginController.GetHomePage);
router.get("/login", loginController.loginForm);
router.post("/login", loginController.login);
router.get("/register", loginController.registerForm);
router.post("/register", loginController.register);
router.get('/logout',loginController.logout);
router.get('/is-admin',loginController.isAdmin);
router.get('/getSessionUsername',loginController.getSessionUsername);

module.exports = router;