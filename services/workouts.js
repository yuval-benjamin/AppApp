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

async function GetSelectedWorkouts(req) {
  console.log("------------ selected workout - service -----------------");
  console.log(req);
  const { category, weather, duration } = req;

  const selectedWorkouts = {
    category: Array.isArray(category) ? category : [category].filter(Boolean),
    weather: Array.isArray(weather) ? weather : [weather].filter(Boolean),
    duration: Array.isArray(duration) ? duration : [duration].filter(Boolean)
  };

  console.log("------------ selected workouts - service -----------------");
  console.log(selectedWorkouts);

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

  console.log("------------ matchConditions - service -----------------");
  console.log(matchConditions);

  const pipeline = [
    { $match: { $and: matchConditions } }
  ];

  console.log("------------ pipeline - service -----------------");
  console.log(pipeline);

  const fetchedWorkouts = await Workout.aggregate(pipeline).exec();

  console.log("------------ fetchedWorkouts - service -----------------");
  console.log(fetchedWorkouts);

  return fetchedWorkouts;
}


module.exports = {
    getWorkoutById,
    getAllWorkouts,
    GetWorkoutIfContains,
    GetSelectedWorkouts
    // createWorkout,
    // updateWorkout,
    // deleteWorkout
}