const express = require("express");
const router = express.Router();

const adminController  = require("../controllers/Admin");

router.get("/", adminController.GetAdminPage);

module.exports = router;