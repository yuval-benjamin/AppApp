const orderService = require("../services/orders");

async function submitOrder(req, res) {
  const { workouts, price } = req.body;
  const newOrder = await orderService.createOrder(
    req.session.username,
    workouts,
    price
  );
  res.json(newOrder._id);
}

async function updateOrder(req, res) {
  try {
    const orderId = req.params.id;
    const { customer, workouts, price } = req.body;
    const updatedOrder = await orderService.updateOrder(orderId, {
      customer,
      workouts,
      price,
    });
    console.log("update function");
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
  res.render("orderHistory", { orders });
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
  updateOrder,
  deleteOrder,
  getOrderHistory,
  isUsername,
  getOrders,
  getMyOrders,
};
