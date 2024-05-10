const workoutsService = require('../services/workouts')
const mongoose = require('mongoose')

async function GetHomePage(req, res){
    const workouts = await workoutsService.getAllWorkouts()
    res.render("home", {workouts})
}

async function GetNearMePage(req, res){
    const workouts = await workoutsService.getAllWorkouts()
    res.render("nearme", {workouts})
}

async function GetWorkout(req, res){
    const workout = await workoutsService.getWorkoutById(req.params.id);
    if (!workout) {
        return res.status(404).json({ errors: ['Workout not found'] });
    }
    res.render("test", {workout})
}


module.exports = {
    GetHomePage,
    GetNearMePage,
    GetWorkout
}