const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    username : {
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
    }
});

const Customer = mongoose.model('Customer', customerSchema, 'customers');
module.exports = Customer; // Export the Customer model