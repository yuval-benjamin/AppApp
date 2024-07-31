const express = require("express");
const router = express.Router();

const loginController  = require("../controllers/login");
const workoutsController  = require("../controllers/workouts")

router.get("/nearme", loginController.isLoggedIn, workoutsController.GetNearMePage)
router.get("/featuredworkouts", loginController.isLoggedIn, workoutsController.GetFeaturedWorkoutsPage)

module.exports = router;