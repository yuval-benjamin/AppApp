const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orders");
const loginController = require("../controllers/login");
const customersController = require("../controllers/customers");

// Get
router.get("/my", loginController.isLoggedIn, orderController.getMyOrders);

// List
router.get("/", customersController.isAdmin, orderController.getOrders);

// Create
router.post("/", orderController.submitOrder);

// Update
router.put("/:id", orderController.setArrived);

// Delete
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
