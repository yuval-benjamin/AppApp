
const AdminService = require("../services/admin")
const customersService = require('../services/customers')
const workoutsService = require('../services/workouts')
const path = require('path').resolve(__dirname, '..')

async function GetAdminPage(req, res){
    res.sendFile("public/views/adminPage.html", { root: path });
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
    // res.render("facebook", {})
    res.sendFile("public/views/facebook.html", { root: path });
}

async function GetFollowers(req, res){
    const response = await fetch(process.env.FACEBOOK_GET_FOLLOWERS_URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + process.env.FACEBOOK_TOKEN
        }
    })
    res.json(response.json)

}

async function GetCreateWorkoutPage(req, res){
    res.render("createWorkout", {})
}

async function GetWorkoutsPage(req, res){
    const workouts = await workoutsService.getAllWorkouts()
    res.render("adminWorkouts", {workouts})
}

module.exports = {
    GetAdminPage,
    GetChartsPage,
    GetFacebookPage,
    GetWorkoutsPage,
    GetCreateWorkoutPage,
    GetFollowers
}
