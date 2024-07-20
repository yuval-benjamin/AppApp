const workoutsService = require('../services/workouts')
const customersService = require('../services/customers')
const mongoose = require('mongoose')

async function GetAllWorkouts(req, res){
    const workouts = await workoutsService.getAllWorkouts()
    res.json(workouts);
}


async function GetNearMePage(req, res){
    const workouts = await workoutsService.getAllWorkouts()
    const isAdmin = await customersService.isAdmin(req.session.username);
    res.render("nearme", {workouts , isAdmin})
}

async function SearchWorkout(req, res){
    const foundworkouts = await workoutsService.GetWorkoutIfContains(req.params.workout)
    res.json(foundworkouts)
}

async function GetSelectedWorkouts(req, res){
    const selectedWorkouts = await workoutsService.GetSelectedWorkouts(req.query)
    res.json(selectedWorkouts)
}

module.exports = {
    SearchWorkout,
    GetNearMePage,
    GetAllWorkouts,
    GetSelectedWorkouts
}
