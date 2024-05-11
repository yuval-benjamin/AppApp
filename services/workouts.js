const Workout = require('../models/workouts');
const mongoose = require('mongoose')

async function getAllWorkouts() {
    const workouts = await Workout.find()
    return workouts
};

async function getWorkoutById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null
    }

    return await Workout.findById(id)
}

async function GetWorkoutIfContains(searchString) {
    const regexPattern = new RegExp(searchString, 'i')

    try {
      const workouts = await Workout.find({ name: { $regex: regexPattern } })
      return workouts
    } catch (error) {
      return null
    }
}

// const deleteWorkout = async (id) => {
//     const workouts = await getWorkoutById(id);
//     if (!workouts)
//         return null;
//     await workouts.remove();
//     return workouts;
// };

module.exports = {
    getWorkoutById,
    getAllWorkouts,
    GetWorkoutIfContains,
    // createWorkout,
    // updateWorkout,
    // deleteWorkout
}