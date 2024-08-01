const orderService = require("../services/orders");
const customerService = require("../services/customers");
const workoutService = require("../services/workouts")

async function submitOrder(req, res) {
  const customer = await customerService.getCustomerByUsername(req.session.username);
  const newOrder = await orderService.createOrder(
    req.session.username,
    customer.cart,
    price
  );
  res.json(newOrder._id);
}

async function setConfirmed(req, res) {
  try {
    const orderId = req.params.id;
    const updatedOrder = await orderService.updateOrder(orderId, { confirmed: true });
    if (!updatedOrder) {
      return res.status(404).json({ errors: ["Order not found"] });
    }

    res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).send("Failed to update order");
  }
}

async function deleteOrder(req, res) {
  try {
    const orderId = req.params.id;
    const order = await orderService.deleteOrder(orderId);
    if (!order) {
      return res.status(404).json({ errors: ["Order not found"] });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).send("Failed to delete order:", error);
  }
}

async function getOrderHistory(req, res) {
  const orders = await orderService.getUserOrders(req.session.username);
  const workouts = await workoutService.getAllWorkouts()
  res.render("orderHistory", { orders , workouts });
}

async function isUsername(req, res, next) {
  const currentSessionUsername = req.session.username;
  const requestedUsername = req.params.username;
  if (currentSessionUsername == requestedUsername) return next();
  else res.redirect("/");
}

async function getOrders(req, res) {
  const orders = await orderService.getOrders();
  res.json(orders);
}

async function getMyOrders(req, res) {
  const orders = await orderService.getUserOrders(req.session.username);
  res.json(orders);
}

module.exports = {
  submitOrder,
  setConfirmed,
  deleteOrder,
  getOrderHistory,
  isUsername,
  getOrders,
  getMyOrders,
};
