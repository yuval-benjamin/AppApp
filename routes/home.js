const express = require("express");
const router = express.Router();

const loginController  = require("../controllers/login");
const workoutsController  = require("../controllers/workouts")

router.get("/nearme", loginController.isLoggedIn, workoutsController.GetNearMePage)

module.exports = router;