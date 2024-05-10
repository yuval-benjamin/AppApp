const Workout = require('../models/workouts');
const mongoose = require('mongoose')

async function getAllWorkouts() {
    const workouts = await Workout.find()
    return workouts
}

module.exports = {
    // createWorkout,
    // getWorkoutById,
    getAllWorkouts,
    // updateWorkout,
    // deleteWorkout
}