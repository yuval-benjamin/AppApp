const express = require("express");
const router = express.Router();

const adminController  = require("../controllers/admin");

router.get("/", adminController.GetAdminPage);
router.get("/charts", adminController.GetChartsPage);
router.get("/workouts", adminController.GetWorkoutsPage);
router.get("/facebook", adminController.GetFacebookPage);

module.exports = router;