const Workout = require('../models/workouts');

const getAllWorkouts = async () => {
    return await Workout.find({});
};

module.exports = {
    createWorkout,
    getWorkoutById,
    getAllWorkouts,
    updateWorkout,
    deleteWorkout
}