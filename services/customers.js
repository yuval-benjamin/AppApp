const Customer = require('../models/customers');
const mongoose = require('mongoose')

async function getAllCustomers() {
    const customers = await Customer.find()
    return customers
}

async function getCustomerByUsername(username) {
    try{
        return await Customer.findById(username)
    } catch (error) {
        return null
    }
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

async function isAdmin(username) {
    const customer = await Customer.findById(username);
    try {
        return customer.isAdmin; // Return the value of isAdmin
    } catch (error) {
        return false
    }
}

async function deleteCustomer(id) {
    const customer = await getCustomerByUsername(id);
    if (!customer)
        return null;
  
    await customer.deleteOne();
    return customer;
}

async function updateCustomer(id, customerData) {
    const customer = await getCustomerByUsername(id);
    if (!customer)
        return null;
  
    Object.assign(customer, customerData);
    try {
        await customer.save();
        return customer;
    } catch (error) {
        throw new Error('Error updating customer: ' + error.message);
    }
}

module.exports = {
    getAllCustomers,
    deleteFromCart,
    getCustomerByUsername,
    isAdmin,
    deleteCustomer,
    updateCustomer
}