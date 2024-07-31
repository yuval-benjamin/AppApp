const express = require("express");
const router = express.Router();
const customersController  = require("../controllers/customers");

// Cart
router.post('/addWorkoutToCart', customersController.addWorkoutToCart)
router.post('/deleteWorkoutFromCart', customersController.deleteWorkoutFromCart)
router.post('/deleteAllWorkoutsFromCart', customersController.deleteAllWorkoutsFromCart)

router.route('/:id')
    .get(customersController.isUsername, customersController.GetCartPage)
module.exports = router;

// Delete
router.delete('/:id', customersController.deleteCustomer);

// Update
router.put('/:id', customersController.updateCustomer);

// Create
router.post('/', customersController.createCustomer);
