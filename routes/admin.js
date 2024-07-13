const express = require("express");
const router = express.Router();

const adminController  = require("../controllers/admin");
const workoutsController  = require("../controllers/workouts");

router.get("/", adminController.GetAdminPage);
router.get("/charts", adminController.GetChartsPage);
router.get("/workouts", adminController.GetWorkoutsPage);
router.get("/facebook", adminController.GetFacebookPage);
router.get("/adminWorkouts", adminController.GetWorkoutsPage);
router.get('/createWorkout', adminController.GetCreateWorkoutPage);
router.post('/createWorkout', workoutsController.createWorkout);
router.delete('/deleteWorkout/:id', workoutsController.deleteWorkout);
// router.route('/deleteWorkout/:id').delete(workoutsController.deleteWorkout);
module.exports = router;