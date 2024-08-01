const customersService = require("../services/customers");
const workoutsService = require("../services/workouts");
const loginService = require("../services/login");

async function GetCartPage(req, res) {
  const workouts = await workoutsService.getAllWorkouts();
  const customer = await customersService.getCustomerByUsername(req.params.id);
  if (!customer) {
    return res.status(404).json({ errors: ["Customer not found"] });
  }
  res.render("cart", { workouts, customer });
}

async function isAdmin(req, res, next) {
  const isAdmin = await customersService.isAdmin(req.session.username);
  if (isAdmin) return next();
  else res.redirect("/");
}

async function deleteCustomer(req, res) {
  try {
    const customer = await customersService.deleteCustomer(req.params.id);
    if (!customer) {
      return res.status(404).json({ errors: ["customer not found"] });
    }

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).send("Failed to delete customer:", error);
  }
}

async function createCustomer(req, res) {
  const {
    firstName,
    lastName,
    username,
    email,
    gender,
    birthDate,
    password,
    isAdmin,
  } = req.body;
  try {
    // If username exists, redirect back to createCustomer and show error
    if (await customersService.getCustomerByUsername(username)) {
      return res.render("createCustomer", { error: "Username already taken" });
    }

    await loginService.register(
      firstName,
      lastName,
      username,
      email,
      gender,
      birthDate,
      password,
      isAdmin
    );
    res.redirect("/adminPage/adminCustomers");
  } catch (e) {
    console.error("Error creating customer:", error);
    res.status(500).send("Failed to create customer");
  }
}

async function updateCustomer(req, res) {
  try {
    const customerId = req.params.id;
    const { firstName, lastName, email, gender, birthDate, password, isAdmin } =
      req.body;

    const updatedCustomer = await customersService.updateCustomer(customerId, {
      firstName,
      lastName,
      email,
      gender,
      birthDate,
      password,
      isAdmin,
    });

    if (!updatedCustomer) {
      return res.status(404).json({ errors: ["Customer not found"] });
    }

    res.status(200).json({ message: "Customer updated successfully" });
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).send("Failed to update customer");
  }
}

module.exports = {
  GetCartPage,
  isAdmin,
  deleteCustomer,
  updateCustomer,
  createCustomer,
};
