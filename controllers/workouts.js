const workoutsModel = require('../models/workouts')

function GetHomePage(req,res){
    const workouts = workoutsModel.getAllWorkouts()

    res.render('homePage.ejs', {workouts})
}

module.exports = {
    GetHomePage
}