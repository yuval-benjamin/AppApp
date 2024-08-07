const customersService = require("../services/customers");
const workoutsService = require("../services/workouts");
const orderService = require("../services/orders");
const path = require("path").resolve(__dirname, "..");

async function GetAdminPage(req, res) {
  res.sendFile("public/views/adminPage.html", { root: path });
}

async function GetChartsPage(req, res) {
  const customers = await customersService.getAllCustomers();
  res.render("charts", { customers });
}

async function GetFacebookPage(req, res) {
  // res.render("facebook", {})
  res.sendFile("public/views/facebook.html", { root: path });
}

async function GetFollowers(req, res){
    const response = await fetch(process.env.FACEBOOK_GET_FOLLOWERS_URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + process.env.FACEBOOK_TOKEN
        }
    })
    const resData = await response.text(); 
    const data = JSON.parse(resData); 
    res.json(data); 
}

// All admin workout funtions
async function GetWorkoutsPage(req, res) {
  const workouts = await workoutsService.getAllWorkouts();
  res.render("adminWorkouts", { workouts });
}

async function GetCreateWorkoutPage(req, res) {
  res.render("createWorkout", {});
}

async function GetUpdateWorkoutPage(req, res) {
  try {
    const workout = await workoutsService.getWorkoutById(req.params.id);

    if (!workout) {
      return res.status(404).render("404", { message: "Workout not found" });
    }

    res.render("updateWorkout", { workout });
  } catch (error) {
    console.error("Error fetching workout for edit:", error);
    res.status(500).send("Failed to load workout for editing");
  }
}

// All admin customer funtions
async function GetCustomersPage(req, res) {
  const customers = await customersService.getAllCustomers();
  res.render("adminCustomers", { customers });
}

async function GetCreateCustomerPage(req, res) {
  res.render("createCustomer", { error: null });
}

async function GetUpdateCustomerPage(req, res) {
  try {
    const customer = await customersService.getCustomerByUsername(
      req.params.id
    );

    if (!customer) {
      return res.status(404).render("404", { message: "Customer not found" });
    }

    res.render("updateCustomer", { customer });
  } catch (error) {
    console.error("Error fetching customer for edit:", error);
    res.status(500).send("Failed to load customer for editing");
  }
}

async function getOrders(req, res) {
  const orders = await orderService.getOrders();
  const workouts = await workoutsService.getAllWorkouts()
  res.render("adminOrders", { orders, workouts });
}

module.exports = {
  GetAdminPage,
  GetChartsPage,
  GetFacebookPage,
  GetWorkoutsPage,
  GetCreateWorkoutPage,
  GetUpdateWorkoutPage,
  GetFollowers,
  GetCustomersPage,
  GetCreateCustomerPage,
  GetUpdateCustomerPage,
  getOrders,
};
