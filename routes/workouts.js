const express = require("express");
const path = require('path').resolve(__dirname, '..')
const router = express.Router();

const workoutsController  = require("../controllers/workouts")

router.get("/", workoutsController.GetAllWorkouts)
router.get("/selectedWorkouts", workoutsController.GetSelectedWorkouts)

router.get("/:workout", workoutsController.SearchWorkout)

module.exports = router;