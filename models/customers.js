const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    _id: String,
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    gender : {
        type: String,
        required: true
    },
    birthDate : {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: Array
    },
    isAdmin: {
        type: Boolean
    }
});

const Customer = mongoose.model('Customer', customerSchema, 'customers');
module.exports = Customer; // Export the Customer model