const workoutsService = require('../services/workouts')
const mongoose = require('mongoose')

async function GetHomePage(req, res){
    const workouts = await workoutsService.getAllWorkouts()
    res.render("home", {workouts})
}

async function GetNearMePage(req, res){
    const workouts = await workoutsService.getAllWorkouts()
    res.render("nearme", {workouts})
}

async function GetAllWorkouts(req, res){
    const workout = await workoutsService.getAllWorkouts()
    res.render("adminPage", {workout})
}

// This function is only to show the use of the getWorkoutById function - CAN DELETE
async function GetWorkout(req, res){
    const workout = await workoutsService.getWorkoutById(req.params.id)
    if (!workout) {
        return res.status(404).json({ errors: ['Workout not found'] })
    }
    res.render("test", {workout})
}

async function SearchWorkout(req, res){
    const workouts = await workoutsService.GetWorkoutIfContains(req.params.search)
    if (!workouts) {
        return res.status(404).json({ errors: ['Workouts not found'] })
    }
    res.render("home", {workouts})
}

async function createWorkout(req, res) {
    try {
        const { name, description, time, location, price, category, supplier, calories, coordinates, image, weather } = req.body;
        const newWorkout = await workoutsService.createWorkout({
            name,
            description,
            time: new Date(time),
            location,
            price,
            category,
            supplier,
            calories,
            coordinates,
            image,
            weather
        });
        res.redirect('/adminPage/adminWorkouts');
    } catch (error) {
        console.error('Error creating workout:', error);
        res.status(500).send('Failed to create workout');
    }
}

async function deleteWorkout(req, res) {
    console.log("delete workout controller")
    console.log(req.params)
    try {
    const workout = await workoutsService.deleteWorkout(req.params.id);
    if (!workout) {
      return res.status(404).json({ errors: ['workout not found'] });
    }
    res.redirect('/adminPage/adminWorkouts'); // Adjust the route as needed
    } catch (error) {
    console.error('Error deleting workout:', error);
    res.status(500).send('Failed to delete workout');
    }
}

module.exports = {
    GetHomePage,
    GetNearMePage,
    GetWorkout,
    SearchWorkout,
    GetAllWorkouts,
    createWorkout,
    deleteWorkout
}