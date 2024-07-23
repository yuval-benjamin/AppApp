const customersService = require('../services/customers')
const workoutsService = require('../services/workouts')

async function GetCartPage(req, res){
    const workouts = await workoutsService.getAllWorkouts()
    const customer = await customersService.getCustomerByUsername(req.params.username)
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

async function isUsername(req, res, next) {
  const currentSessionUsername = req.session.username;
  const requestedUsername = req.params.username;
  console.log("currentSessionUsername - " + currentSessionUsername + " requestedUsername - " + requestedUsername)
  if (currentSessionUsername == requestedUsername)
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

async function deleteWorkoutFromCart(req, res){
  const { workoutId } = req.body;
  const username = req.session.username;
  try {
    const result = await customersService.deleteWorkoutFromCart(username, workoutId);
    res.status(200).json(result);
  } catch (error) {
      res.status(500).json({ error: 'Failed to delete workout from cart' });
  }
}

async function deleteWorkoutsFromCart(req, res){
  const { workoutId } = req.body;
  const username = req.session.username;
  try {
    const result = await customersService.deleteWorkoutsFromCart(username, workoutId);
    res.status(200).json(result);
  } catch (error) {
      res.status(500).json({ error: 'Failed to delete workout from cart' });
  }
}



module.exports = {
    GetCartPage,
    isAdmin,
    addWorkoutToCart,
    deleteWorkoutFromCart,
    deleteWorkoutsFromCart,
    isUsername
}