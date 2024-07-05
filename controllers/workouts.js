const workoutsService = require('../services/workouts')
const mongoose = require('mongoose')


async function GetNearMePage(req, res){
    const workouts = await workoutsService.getAllWorkouts()
    res.render("nearme", {workouts})
}

async function GetAllWorkouts(req, res){
    const workouts = await workoutsService.getAllWorkouts()
    res.json(workouts);
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
    const foundworkouts = await workoutsService.GetWorkoutIfContains(req.params.workout)
    res.json(foundworkouts)
}

module.exports = {
    GetNearMePage,
    GetWorkout,
    SearchWorkout,
    GetAllWorkouts
}