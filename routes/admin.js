const express = require("express");
const router = express.Router();

const adminController  = require("../controllers/admin");

const customersController  = require("../controllers/customers");

router.get("/", customersController.isAdmin ,adminController.GetAdminPage);
router.get("/charts", customersController.isAdmin ,adminController.GetChartsPage);
router.get("/facebook", customersController.isAdmin ,adminController.GetFacebookPage);
router.get("/getFollowers", customersController.isAdmin, adminController.GetFollowers);
router.get("/adminWorkouts", customersController.isAdmin, adminController.GetWorkoutsPage);
router.get('/createWorkout', customersController.isAdmin, adminController.GetCreateWorkoutPage);
router.get('/updateWorkout/:id', customersController.isAdmin, adminController.GetUpdateWorkoutPage);

module.exports = router;