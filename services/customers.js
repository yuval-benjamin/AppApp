const Customer = require('../models/customers');
const mongoose = require('mongoose')

async function getAllCustomers() {
    const customers = await Customer.find()
    return customers
}

async function getCustomerById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("ObjectID is not valid")
        return null
    }
    return await Customer.findById(id)
}

async function getCustomerByUsername(username) {
    return await Customer.findOne({ username });
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
    deleteFromCart,
    getCustomerByUsername
}