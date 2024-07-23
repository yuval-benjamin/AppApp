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

async function addWorkoutToCart(username, workoutId) {
    const customer = await Customer.findById(username);
    console.log("-------- addWorkoutToCart - service -----------")
    console.log(customer)
    try {
        if (!customer) {
            throw new Error('User not found');
        }
        customer.cart.push({ id: workoutId });
        await customer.save();
        return { message: 'Workout added to cart successfully' };
    } catch (error) {
        throw new Error('Failed to add workout to cart');
    }
}

async function deleteWorkoutFromCart(username, workoutId) {
    const customer = await Customer.findById(username);
    console.log("-------- deleteWorkoutFromCart - service -----------")
    console.log(username)
    console.log(workoutId)
    try {
        if (!customer) {
            throw new Error('User not found');
        }

        customer.cart = customer.cart.filter(item => item.id !== workoutId);       
        await customer.save();

        return { message: 'Workout removed from cart successfully' };
    } catch (error) {
        throw new Error('Failed to remove workout from cart');
    }
}

async function deleteWorkoutsFromCart(username, workoutId) {
    const customer = await Customer.findById(username);
    console.log("-------- deleteWorkoutFromCart - service -----------")
    console.log(username)
    console.log(workoutId)
    try {
        if (!customer) {
            throw new Error('User not found');
        }

        customer.cart = customer.cart.filter(item => item.id !== workoutId);       
        await customer.save();
        
        return { message: 'Workout removed from cart successfully' };
    } catch (error) {
        throw new Error('Failed to remove workout from cart');
    }
}


module.exports = {
    getAllCustomers,
    deleteFromCart,
    getCustomerByUsername,
    isAdmin,
    addWorkoutToCart,
    deleteWorkoutFromCart,
    deleteWorkoutsFromCart
}