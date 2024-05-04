const workoutsModel = require('../models/workouts')

function GetHomePage(req,res){
    const workouts = workoutsModel.getAllWorkouts()
    res.render('homepage', {workouts})
}

function GetNearMePage(req,res){
    const workouts = workoutsModel.getAllWorkouts()
    res.render('nearme', {workouts})
}

module.exports = {
    GetHomePage,
    GetNearMePage
}