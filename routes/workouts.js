const express = require("express");
const router = express.Router();

const workoutsController  = require("../controllers/workouts")
const customersController  = require("../controllers/customers")

router.get("/", workoutsController.GetHomePage)

router.route('/:id')
    .get(workoutsController.GetWorkout)
    // .delete(workoutsController.deleteWorkout);
    // .patch(workoutsController.updateWorkout)

module.exports = router;