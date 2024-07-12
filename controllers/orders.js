const ordersService = require('../services/orders')
const mongoose = require('mongoose')

async function GetHomePage(req, res){
    const workouts = await ordersService.getAllWorkouts()
    res.render("home", {workouts})
}

async function SearchWorkout(req, res){
    const workouts = await ordersService.GetWorkoutIfContains(req.params.search)
    if (!workouts) {
        return res.status(404).json({ errors: ['Workouts not found'] })
    }
    res.render("home", {workouts})
}

module.exports = {
    GetNearMePage,
    GetWorkout,
    GetAllWorkouts
}