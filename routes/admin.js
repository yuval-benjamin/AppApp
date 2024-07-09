const express = require("express");
const router = express.Router();

const adminController  = require("../controllers/admin");
const customersController  = require("../controllers/customers");

router.get("/", customersController.isAdmin ,adminController.GetAdminPage);
router.get("/charts", customersController.isAdmin ,adminController.GetChartsPage);
router.get("/facebook", customersController.isAdmin ,adminController.GetFacebookPage);

module.exports = router;