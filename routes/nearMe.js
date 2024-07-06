const express = require("express");
const router = express.Router();
const path = require('path').resolve(__dirname, '..')

router.get("/", function(req, res) {
    res.sendFile("public/views/nearMe.html", { root: path });
});


// const nearMeController  = require("../controllers/nearMe");

// router.get("/", nearMeController.GetNearMePage);

module.exports = router;