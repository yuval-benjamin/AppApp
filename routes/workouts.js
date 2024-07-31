const express = require("express");
const path = require('path').resolve(__dirname, '..')
const router = express.Router();

const workoutsController  = require("../controllers/workouts")

// Filter
router.get("/selectedWorkouts", workoutsController.GetSelectedWorkouts)

// List
router.get("/", workoutsController.GetAllWorkouts)

// Create
router.post('/', workoutsController.createWorkout);

// Delete
router.delete('/:id', workoutsController.deleteWorkout);

// Search
router.get("/:workout", workoutsController.SearchWorkout)

// Update
router.put('/:id', workoutsController.updateWorkout);

module.exports = router;