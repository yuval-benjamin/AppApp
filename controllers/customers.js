const workoutsService = require('../services/customers')

async function GetCartPage(req, res){
    // const workouts = await workoutsService.getAllWorkouts()
    // res.render("cart", {workouts})
    res.render("cart")
}

module.exports = {
    GetCartPage,
    // GetNearMePage
}