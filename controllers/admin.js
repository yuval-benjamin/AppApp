
const AdminService = require("../services/admin")
const customersService = require('../services/customers')
const workoutsService = require('../services/workouts')

async function GetAdminPage(req, res){
    res.render("adminPage", {})
}

async function GetChartsPage(req, res){
    const customers = await customersService.getAllCustomers()
    res.render("charts", { customers })
}

module.exports = {
    GetAdminPage,
    GetChartsPage,
}