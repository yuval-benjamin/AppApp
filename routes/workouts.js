const express = require("express");
const path = require('path').resolve(__dirname, '..')
const router = express.Router();

const workoutsController  = require("../controllers/workouts")
const customersController  = require("../controllers/customers")

router.get("/", function(req, res) {
    res.sendFile("public/home.html", { root: path });
});

router.get("/nearme", workoutsController.GetNearMePage)

router.get("/workouts", workoutsController.GetAllWorkouts)

router.get("/:workout", workoutsController.SearchWorkout)
// router.route('/:id')
//     .get(workoutsController.GetWorkout)
    // .patch(workoutsController.updateWorkout)
    // .delete(workoutsController.deleteWorkout);

module.exports = router;