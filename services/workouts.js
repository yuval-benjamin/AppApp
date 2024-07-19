const Workout = require('../models/workouts');
const mongoose = require('mongoose')

async function getAllWorkouts() {
    const workouts = await Workout.find()
    return workouts
}

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

async function createWorkout(workoutData) {
  const workout = new Workout(workoutData);
  try {
      await workout.save();
      return workout;
  } catch (error) {
      throw new Error('Error creating workout: ' + error.message);
  }
}

async function deleteWorkout(id) {
  const workout = await getWorkoutById(id);
  if (!workout)
      return null;

  await workout.deleteOne();
  return workout;
}

module.exports = {
    getWorkoutById,
    getAllWorkouts,
    GetWorkoutIfContains,
    createWorkout,
    deleteWorkout
    // updateWorkout,
}