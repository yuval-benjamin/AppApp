const workoutsModel = require('../models/workouts')

function GetHomePage(req,res){
    const workouts = workoutsModel.getAllWorkouts()
    res.render('homePage.ejs', {workouts})
}

function GetNearMePage(req,res){
    const workouts = workoutsModel.getAllWorkouts()
    res.render('nearMe.ejs', {workouts})
}


module.exports = {
    GetHomePage,
    GetNearMePage
}