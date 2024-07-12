const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Customer', 
        required: true 
    },
    items: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Workout' 
    }],
    total: { 
        type: Number, 
        default: 0 }
});

const Cart = mongoose.model('Cart', CartSchema, 'cart');
module.exports = Cart; // Export the Customer model