
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

async function GetFacebookPage(req, res){
    res.render("facebook", {})
}

async function GetWorkoutsPage(req, res){
    const workouts = await workoutsService.getAllWorkouts()
    res.render("adminWorkouts", {workouts})
}

async function CreateWorkout(req, res) {
    try {
        const workoutData = req.body;
        const newWorkout = await workoutsService.createWorkout(workoutData);
        res.status(201).json(newWorkout);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create workout: ' + error.message });
    }
}
module.exports = {
    GetAdminPage,
    GetChartsPage,
    GetFacebookPage,
    CreateWorkout,
    GetWorkoutsPage
}