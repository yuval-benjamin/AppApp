const express = require("express");
const router = express.Router();

const loginController = require("../controllers/login");
const workoutsController = require("../controllers/workouts");
const orderController = require("../controllers/orders");

router.use(loginController.isLoggedIn);

router.get("/featuredworkouts", workoutsController.GetFeaturedWorkoutsPage)

router.get("/nearme", workoutsController.GetNearMePage);

router.get("/orders/my", orderController.getOrderHistory);

module.exports = router;
