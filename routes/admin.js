const express = require("express");
const router = express.Router();

const adminController  = require("../controllers/admin");

router.get("/", adminController.GetAdminPage);
router.get("/charts", adminController.GetChartsPage);
router.get("/facebook", adminController.GetFacebookPage);
router.get("/getFollowers", adminController.GetFollowers);

module.exports = router;