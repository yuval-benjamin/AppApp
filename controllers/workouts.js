const workoutsService = require('../services/workouts')
const mongoose = require('mongoose')

async function GetNearMePage(req, res){
    const workouts = await workoutsService.getAllWorkouts()
    res.render("nearme", {workouts})
}

async function GetAllWorkouts(req, res){
    const workout = await workoutsService.getAllWorkouts()
    res.render("adminPage", {workout})
}

// This function is only to show the use of the getWorkoutById function - CAN DELETE
async function GetWorkout(req, res){
    const workout = await workoutsService.getWorkoutById(req.params.id)
    if (!workout) {
        return res.status(404).json({ errors: ['Workout not found'] })
    }
    res.render("test", {workout})
}

async function SearchWorkout(req, res){
    const workouts = await workoutsService.GetWorkoutIfContains(req.params.search)
    if (!workouts) {
        return res.status(404).json({ errors: ['Workouts not found'] })
    }
    res.render("home", {workouts})
}

module.exports = {
    GetNearMePage,
    GetWorkout,
    SearchWorkout,
    GetAllWorkouts
}