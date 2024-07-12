const Order = require('../models/orders');
const mongoose = require('mongoose')

async function getAllOrders() {
    const customers = await Customer.find()
    return customers
}

exports.list = async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.userId }).populate('items');
        res.render('orders/index', { orders });
    } catch (error) {
        res.status(500).send('Error retrieving orders');
    }
};
async function getCustomerById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("ObjectID is not valid")
        return null
    }
    return await Customer.findById(id)
}

async function deleteFromCart(customerId, workoutId) {
    try {
        const customer = await Customer.findById(customerId)
        customer.cart = customer.cart.filter(item => item.workout_id.toString() !== workoutId);
        await customer.save();
        return customer;
    } catch (error) {
        throw new Error('Failed to delete item from cart: ' + error.message);
    }
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    deleteFromCart
}