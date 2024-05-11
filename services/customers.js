const Customer = require('../models/customers');
const mongoose = require('mongoose')

async function getAllCustomers() {
    const customers = await Customer.find()
    return customers
}

async function getCustomerById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null
    }
    return await Customer.findById(id)
}

module.exports = {
    getAllCustomers,
    getCustomerById
}