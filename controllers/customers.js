const customersService = require('../services/customers')
const workoutsService = require('../services/workouts')

async function GetCartPage(req, res){
    const workouts = await workoutsService.getAllWorkouts()
    const customer = await customersService.getCustomerById(req.params.id)
    if (!customer) {
        return res.status(404).json({ errors: ['Customer not found'] })
    }
    res.render("cart", { workouts , customer })
}

module.exports = {
    GetCartPage,
}