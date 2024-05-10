const Workout = require('../models/workouts');
const mongoose = require('mongoose')

async function getAllWorkouts() {
    const workouts = await Workout.find()
    return workouts
};

const getWorkoutById = async (id) => {
    return await Workout.findById(id);
};

// const deleteWorkout = async (id) => {
//     const workouts = await getWorkoutById(id);
//     if (!workouts)
//         return null;
//     await workouts.remove();
//     return workouts;
// };

module.exports = {
    // createWorkout,
    getWorkoutById,
    getAllWorkouts,
    // updateWorkout,
    // deleteWorkout
}