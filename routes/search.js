const express = require("express");
const router = express.Router();
const workoutsController = require("../controllers/workouts");

// Middleware to parse the body of the request
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", (req, res) => {
    const searchTerm = req.body.query;
    if (searchTerm) {
        res.redirect(`/search/${searchTerm}`);
    } else {
        res.status(400).send("Search term is required");
    }
});

router.get("/:search", workoutsController.SearchWorkout);

module.exports = router;
