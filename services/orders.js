const Order = require('../models/orders');
const Customer = require('../models/customer');
const Workout = require('../models/workout');
const mongoose = require('mongoose')

async function getAllOrders() {
    try {
        const orders = await Order.find({ customer: req.userId }).populate('items');
        res.render('orders/index', { orders });
    } catch (error) {
        res.status(500).send('Error retrieving orders');
    }
}

async function createOrder() {
    try {
        const workouts = await Workout.find();
        res.render('orders/create', { workouts });
    } catch (error) {
        res.status(500).send('Error loading create order page');
    }
}

exports.store = async (req, res) => {
    try {
        const { items, total } = req.body;
        const order = new Order({ customer: req.userId, items, total });
        await order.save();
        res.redirect('/orders');
    } catch (error) {
        res.status(500).send('Error creating order');
    }
};

exports.edit = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items');
        const workouts = await Workout.find();
        res.render('orders/edit', { order, workouts });
    } catch (error) {
        res.status(500).send('Error loading edit order page');
    }
};

exports.update = async (req, res) => {
    try {
        const { items, total } = req.body;
        await Order.findByIdAndUpdate(req.params.id, { items, total });
        res.redirect('/orders');
    } catch (error) {
        res.status(500).send('Error updating order');
    }
};

exports.delete = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.redirect('/orders');
    } catch (error) {
        res.status(500).send('Error deleting order');
    }
};

exports.search = async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.userId, date: { $regex: req.query.q, $options: 'i' } }).populate('items');
        res.render('orders/search', { orders });
    } catch (error) {
        res.status(500).send('Error searching orders');
    }
};
module.exports = {
    getAllCustomers,
    getCustomerById,
    deleteFromCart
}