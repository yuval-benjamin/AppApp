const customersService = require('../services/customers')
const workoutsService = require('../services/workouts')

async function GetCartPage(req, res){
    const workouts = await workoutsService.getAllWorkouts()
    const customer = await customersService.getCustomerByUsername(req.params.id)
    if (!customer) {
        return res.status(404).json({ errors: ['Customer not found'] })
    }
    res.render("cart", { workouts , customer })
}

async function isAdmin(req, res, next) {
    const isAdmin = await customersService.isAdmin(req.session.username);
    if (isAdmin)
      return next()
    else
      res.redirect('/')
}

async function addWorkoutToCart(req, res){
  const { workoutId } = req.body;
  const username = req.session.username;
  console.log("-------------- addWorkoutToCart ---------------")
  console.log(workoutId + " " + username)
  try {
    const result = await customersService.addWorkoutToCart(username, workoutId);
    res.status(200).json(result);
  } catch (error) {
      res.status(500).json({ error: 'Failed to add workout to cart' });
  }
}



module.exports = {
    GetCartPage,
    isAdmin,
    addWorkoutToCart
}