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

async function deleteCustomer(req, res) {
  try {
    const customer = await customersService.deleteCustomer(req.params.id);
    if (!customer) {
      return res.status(404).json({ errors: ['customer not found'] });
    }

    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).send('Failed to delete customer:', error);
  }
}

module.exports = {
    GetCartPage,
    isAdmin,
    deleteCustomer
}