const workoutsService = require('../services/workouts')

async function GetHomePage(req, res){
    const workouts = await workoutsService.getAllWorkouts()
    res.render("home", {workouts})
}

async function GetNearMePage(req, res){
    const workouts = await workoutsService.getAllWorkouts()
    res.render("nearme", {workouts})
}

module.exports = {
    GetHomePage,
    GetNearMePage
}