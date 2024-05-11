const express = require("express");
const router = express.Router();

const workoutsController  = require("../controllers/workouts");

router.get("/", workoutsController.GetHomePage)
router.get("/nearme", workoutsController.GetNearMePage)

router.route('/:id')
    .get(workoutsController.GetWorkout)
    // .patch(workoutsController.updateWorkout)
    // .delete(workoutsController.deleteWorkout);

module.exports = router;