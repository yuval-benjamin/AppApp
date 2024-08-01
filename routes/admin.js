const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");
const customersController = require("../controllers/customers");

router.get("/", customersController.isAdmin, adminController.GetAdminPage);
router.get(
  "/charts",
  customersController.isAdmin,
  adminController.GetChartsPage
);
router.get(
  "/facebook",
  customersController.isAdmin,
  adminController.GetFacebookPage
);
router.get(
  "/getFollowers",
  customersController.isAdmin,
  adminController.GetFollowers
);

// Admin - workouts
router.get(
  "/adminWorkouts",
  customersController.isAdmin,
  adminController.GetWorkoutsPage
);
router.get(
  "/createWorkout",
  customersController.isAdmin,
  adminController.GetCreateWorkoutPage
);
router.get(
  "/updateWorkout/:id",
  customersController.isAdmin,
  adminController.GetUpdateWorkoutPage
);

// Admin - customers
router.get(
  "/adminCustomers",
  customersController.isAdmin,
  adminController.GetCustomersPage
);
router.get(
  "/createCustomer",
  customersController.isAdmin,
  adminController.GetCreateCustomerPage
);
router.get(
  "/updateCustomer/:id",
  customersController.isAdmin,
  adminController.GetUpdateCustomerPage
);

// Admin - orders
router.get("/orders", customersController.isAdmin, adminController.getOrders);
module.exports = router;
