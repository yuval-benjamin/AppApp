const Workout = require('../models/workouts');
const mongoose = require('mongoose')

async function getAllWorkouts() {
    const workouts = await Workout.find()
    return workouts
};

const getWorkoutByName = async (name) => {
    return await Workout.findById(name);
};

// const deleteWorkout = async (name) => {
//     const workouts = await getWorkoutByName(name);
//     if (!workouts)
//         return null;
//     await workouts.remove();
//     return workouts;
// };

module.exports = {
    // createWorkout,
    getWorkoutByName,
    getAllWorkouts,
    // updateWorkout,
    // deleteWorkout
}