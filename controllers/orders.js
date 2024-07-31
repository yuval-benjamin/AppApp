const orderService = require("../services/orders");

async function submitOrder(req, res) {
  const { customer, workouts, price } = req.body;
  const newOrder = await orderService.createOrder(customer, workouts, price);
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
    const order = await workoutsService.deleteOrder(orderId);
    if (!order) {
      return res.status(404).json({ errors: ["Order not found"] });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).send("Failed to delete order:", error);
  }
}

async function getOrders(req, res) {
  const orders = await workoutsService.getOrders();
  res.json(orders);
}

async function getUserOrders(req, res) {
  const userOrders = await orderService.getUserOrders(req.params.username);
  res.json(userOrders);
}

module.exports = {
  submitOrder,
  updateOrder,
  deleteOrder,
  getOrders,
  getUserOrders,
};
