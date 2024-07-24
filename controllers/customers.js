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
  if (currentSessionUsername == requestedUsername)
    return next()
  else
    res.redirect('/')
}

async function addWorkoutToCart(req, res){
  const { workoutId } = req.body;
  const username = req.session.username;

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

async function deleteAllWorkoutsFromCart(req, res){
  const username = req.session.username;
  const workoutIdList = await getUserWorkoutsFromCart(username)

  try {
    const result = await customersService.deleteAllWorkoutsFromCart(username);
    res.status(200).json(result);
  } catch (error) {
      res.status(500).json({ error: 'Failed to delete workout from cart' });
  }
}

async function getUserWorkoutsFromCart(username){
  const workoutIds = await customersService.getUserWorkoutsFromCart(username);

  return workoutIds

}






module.exports = {
    GetCartPage,
    isAdmin,
    addWorkoutToCart,
    deleteWorkoutFromCart,
    deleteAllWorkoutsFromCart,
    isUsername
}