const express = require("express");
const router = express.Router();
const customersController = require("../controllers/customers");

router.route("/:id").get(customersController.GetCartPage);

// Delete
router.delete("/:id", customersController.deleteCustomer);

// Update
router.put("/:id", customersController.updateCustomer);

// Create
router.post("/", customersController.createCustomer);

module.exports = router;
