const workoutsService = require('../services/workouts')
const customersService = require('../services/customers')
const mongoose = require('mongoose')

async function GetAllWorkouts(req, res){
    const workouts = await workoutsService.getAllWorkouts()
    res.json(workouts);
}

async function GetNearMePage(req, res){
    const workouts = await workoutsService.getAllWorkouts()
    const isAdmin = await customersService.isAdmin(req.session.username);
    res.render("nearme", {workouts , isAdmin})
}

async function SearchWorkout(req, res){
    const foundworkouts = await workoutsService.GetWorkoutIfContains(req.params.workout)
    res.json(foundworkouts)
}

async function GetSelectedWorkouts(req, res){
    const selectedWorkouts = await workoutsService.GetSelectedWorkouts(req.query)
    res.json(selectedWorkouts)
}

async function createWorkout(req, res) {
    try {
        const { name, description, time, location, price, category, supplier, calories, coordinates, duration, image, weather } = req.body;
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
            duration,
            image,
            weather
        });
        res.redirect('/adminPage/adminWorkouts');
    } catch (error) {
        console.error('Error creating workout:', error);
        res.status(500).send('Failed to create workout');
    }
}

async function updateWorkout(req, res) {
    try {
        const workoutId = req.params.id;
        const { name, description, time, location, price, category, supplier, calories, coordinates, duration, image, weather } = req.body;

        const updatedWorkout = await workoutsService.updateWorkout(workoutId, {
            name,
            description,
            time,
            location,
            price,
            category,
            supplier,
            calories,
            coordinates,
            duration,
            image,
            weather
        });

        if (!updatedWorkout) {
            return res.status(404).json({ errors: ['Workout not found'] });
        }

        res.status(200).json({ message: 'Workout updated successfully' });
    } catch (error) {
        console.error('Error updating workout:', error);
        res.status(500).send('Failed to update workout');
    }
}

async function deleteWorkout(req, res) {
    try {
    const workout = await workoutsService.deleteWorkout(req.params.id);
    if (!workout) {
      return res.status(404).json({ errors: ['workout not found'] });
    }

    res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (error) {
    console.error('Error deleting workout:', error);
    res.status(500).send('Failed to delete workout:', error);
    }
}

module.exports = {
    SearchWorkout,
    GetAllWorkouts,
    createWorkout,
    deleteWorkout,
    GetNearMePage,
    GetAllWorkouts,
    GetSelectedWorkouts,
    updateWorkout
}
