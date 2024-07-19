const express = require("express");
const router = express.Router();
const customersController  = require("../controllers/customers");

router.route('/:id')
    .get(customersController.GetCartPage)
router.post('/addWorkoutToCart', customersController.addWorkoutToCart)

module.exports = router;