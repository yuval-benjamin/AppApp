const express = require("express");
const router = express.Router();
const customersController  = require("../controllers/customers");

router.route('/:id')
    .get(customersController.GetCartPage)
module.exports = router;

// Delete
router.delete('/:id', customersController.deleteCustomer);