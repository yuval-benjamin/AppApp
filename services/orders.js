const Order = require("../models/orders");
const mongoose = require("mongoose");

async function createOrder(customer, workouts) {
  try {
    console.log(workouts)
    const order = new Order({ customer, workouts });
    await order.save();
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

async function getOrderById(orderId) {
  return await Order.findById(orderId);
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
  getOrderById,
};
