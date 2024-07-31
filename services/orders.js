const Order = require("../models/orders");

async function createOrder(customer, workouts, price) {
  try {
    const order = new Order({ customer, workouts, price });
    await order.save();
    return order;
  } catch (error) {
    throw new Error("Error creating order: " + error.message);
  }
}

async function updateOrder(orderId, updateData) {
  try {
    const order = await Order.findById(orderId);
    if (!order) return null;
    Object.assign(order, updateData);
    await order.save();
    return order;
  } catch (error) {
    throw new Error("Error updating order: " + error.message);
  }
}

async function deleteOrder(orderId) {
  const order = await Order.findById(orderId);
  if (!order) return null;

  await order.deleteOne();
  return order;
}

async function getOrders() {
  const orders = await Order.find();
  return orders;
}

async function getUserOrders(username) {
  try {
    const orders = await Order.find({ customer: username });
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrders,
  getUserOrders,
};
