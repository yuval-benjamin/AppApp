const express = require("express");
const router = express.Router();
const customersController = require("../controllers/customers");
const orderController = require("../controllers/orders");

router.use(loginController.isLoggedIn);

router.route(
  "/:username",
  customersController.isUsername,
  orderController.getUserOrders
);

router.get("/", orderController.getOrders);

router.post("/", orderController.submitOrder);

router.put("/:id", orderController.updateOrder);

router.delete("/:id", orderController.deleteOrder);

module.exports = router;
