const express = require("express");
const router = express.Router();

const workoutsController  = require("../controllers/workouts")

router.get("/", workoutsController.GetAllWorkouts)
router.get("/selectedWorkouts", workoutsController.GetSelectedWorkouts)

router.get("/:workout", workoutsController.SearchWorkout)
router.route('/:id')
    .get(workoutsController.GetWorkout)
    // .patch(workoutsController.updateWorkout)
    // .delete(workoutsController.deleteWorkout);

module.exports = router;