const express = require("express");
const router = express.Router();

const adminController  = require("../controllers/admin");

router.get("/", adminController.GetAdminPage);
router.get("/charts", adminController.GetChartsPage);
router.get("/workouts", adminController.GetWorkoutsPage);
router.get("/facebook", adminController.GetFacebookPage);
router.get("/adminWorkouts", adminController.GetWorkoutsPage);
router.post('/createWorkout', adminController.CreateWorkout);

module.exports = router;