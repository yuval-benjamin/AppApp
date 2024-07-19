const express = require("express");
const router = express.Router();

const workoutsController  = require("../controllers/workouts")

// List
router.get("/", workoutsController.GetAllWorkouts)

// Create
router.post('/', workoutsController.createWorkout);

// Delete
router.post('/:id', workoutsController.deleteWorkout);

// Search
router.get("/:workout", workoutsController.SearchWorkout)

// Filter
router.get("/selectedWorkouts", workoutsController.GetSelectedWorkouts)

// is this in use?????
// router.route('/:id').get(workoutsController.GetWorkout) 

// Update


module.exports = router;