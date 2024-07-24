const express = require("express");
const router = express.Router();
const customersController  = require("../controllers/customers");

router.route('/:username')
    .get(customersController.isUsername, customersController.GetCartPage)
router.post('/addWorkoutToCart', customersController.addWorkoutToCart)
router.post('/deleteWorkoutFromCart', customersController.deleteWorkoutFromCart)
router.post('/deleteAllWorkoutsFromCart', customersController.deleteAllWorkoutsFromCart)

module.exports = router;