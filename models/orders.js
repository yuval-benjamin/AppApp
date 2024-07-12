const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Workout'
    }],
    date: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
    }
});

const Order = mongoose.model('Order', orderSchema, 'orders');
module.exports = Order; // Export the Order model