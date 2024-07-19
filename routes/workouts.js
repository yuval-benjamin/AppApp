const express = require("express");
const path = require('path').resolve(__dirname, '..')
const router = express.Router();

const workoutsController  = require("../controllers/workouts")
const customersController  = require("../controllers/customers")

// router.get("/", workoutsController.GetHomePage)

// Create
router.post('/', workoutsController.createWorkout);

// Delete
router.post('/:id', workoutsController.deleteWorkout);

// Search
// router.route('/:id').get(workoutsController.GetWorkout)
router.get("/:workout", workoutsController.SearchWorkout) 




router.get("/", function(req, res) {
    res.sendFile("public/views/home.html", { root: path });
});

// router.get("/nearme", workoutsController.GetNearMePage)

router.get("/workouts", workoutsController.GetAllWorkouts) //// will have to be only "/"
router.get("/selectedWorkouts", workoutsController.GetSelectedWorkouts)

// router.route('/:id')
//     .get(workoutsController.GetWorkout)
    // .patch(workoutsController.updateWorkout)
    // .delete(workoutsController.deleteWorkout);
    // .patch(workoutsController.updateWorkout)

module.exports = router;