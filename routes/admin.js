const express = require("express");
const router = express.Router();

const adminController  = require("../controllers/admin");

router.get("/", adminController.GetAdminPage);
router.get("/charts", adminController.GetChartsPage);

module.exports = router;