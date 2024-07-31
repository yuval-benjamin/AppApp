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

async function GetSelectedWorkouts(req) {
  const { category, weather, duration } = req;

  const selectedWorkouts = {
    category: Array.isArray(category) ? category : [category].filter(Boolean),
    weather: Array.isArray(weather) ? weather : [weather].filter(Boolean),
    duration: Array.isArray(duration) ? duration : [duration].filter(Boolean)
  };

  const matchConditions = [];
  if (selectedWorkouts.category.length > 0) {
    matchConditions.push({ category: { $in: selectedWorkouts.category } });
  }
  if (selectedWorkouts.weather.length > 0) {
    matchConditions.push({ weather: { $in: selectedWorkouts.weather } });
  }
  if (selectedWorkouts.duration.length > 0) {
    matchConditions.push({ duration: { $in: selectedWorkouts.duration } });
  }

  const pipeline = [
    { $match: { $and: matchConditions } }
  ];

  const fetchedWorkouts = await Workout.aggregate(pipeline).exec();
  return fetchedWorkouts;
}

async function updateWorkout(id, workoutData) {
  const workout = await getWorkoutById(id);
  if (!workout)
      return null;

  Object.assign(workout, workoutData);
  try {
      await workout.save();
      return workout;
  } catch (error) {
      throw new Error('Error updating workout: ' + error.message);
  }
}


module.exports = {
    getWorkoutById,
    getAllWorkouts,
    GetWorkoutIfContains,
    createWorkout,
    deleteWorkout,
    GetSelectedWorkouts,
    updateWorkout
}