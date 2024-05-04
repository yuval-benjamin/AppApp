const express = require("express");
const router = express.Router();

const workoutsController  = require("../controllers/workouts");

router.get("/home", workoutsController.GetHomePage)
router.get("/nearme", workoutsController.GetNearMePage)

module.exports = router;