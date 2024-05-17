const express = require("express");
const router = express.Router();
const workoutsController = require("../controllers/workouts");

router.post("/", (req, res) => {
    const searchTerm = req.body.query;
    res.redirect(`/search/${searchTerm}`);
});


router.get("/:search", workoutsController.SearchWorkout);

module.exports = router;
