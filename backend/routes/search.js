const express = require("express");
const router = express.Router();
const workoutsController  = require("../controllers/workouts");

router.route('/:search')
    .get(workoutsController.SearchWorkout)
module.exports = router;