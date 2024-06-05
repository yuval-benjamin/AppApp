const express = require("express");
const router = express.Router();

const workoutsController  = require("../controllers/workouts")
const customersController  = require("../controllers/customers")

router.get("/", workoutsController.GetHomePage)
router.get("/nearme", workoutsController.GetNearMePage)


module.exports = router;