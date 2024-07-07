
const AdminService = require("../services/admin")
const customersService = require('../services/customers')
const workoutsService = require('../services/workouts')

async function GetAdminPage(req, res){
    res.render("adminPage", {})
}

async function GetWorkoutsPage(req, res){
    const workouts = await workoutsService.getAllWorkouts()
    res.render("adminWorkouts", {workouts})
}

async function GetChartsPage(req, res){
    const customers = await customersService.getAllCustomers()
    res.render("charts", { customers })
}

async function GetFacebookPage(req, res){
    res.render("facebook", {})
}

module.exports = {
    GetAdminPage,
    GetChartsPage,
    GetFacebookPage,
    GetWorkoutsPage
}