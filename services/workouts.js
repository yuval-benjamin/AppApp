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

// async function GetSelectedWorkouts(req, res) {
//   // Extract query parameters
//   console.log("------------ selected workout - service -----------------")
//   console.log(req)
//   const { workouts } = req
//   console.log(workouts)
//   console.log("------------ selected workout - service -----------------")
  
//   // Parse query parameters
//   const selectedWorkouts = Array.isArray(workouts) ? workouts : [workouts]
//   console.log("------------ selected workoutss - service -----------------")
//   console.log(selectedWorkouts)
//   // Build the query object
//   const query = {
//       $or: [
//           { category: { $in: selectedWorkouts } },
//       ]
//   }

//   console.log("------------ query - service -----------------")
//   console.log(query)
//   console.log("------------ query - service -----------------")

//   // Query the database
//   const fetchedWorkouts = await Workout.find(query)
//   console.log("------------ fetchedWorkouts - service -----------------")
//   console.log(fetchedWorkouts)
//   console.log("------------ fetchedWorkouts - service -----------------")
//   // Return the results
//   return fetchedWorkouts
// }

async function GetSelectedWorkouts(req) {
  console.log("------------ selected workout - service -----------------");
  console.log(req);
  const { category, weather, duration } = req;
  
  const selectedWorkouts = {
      category: Array.isArray(category) ? category : [category].filter(Boolean),
      weather: Array.isArray(weather) ? weather : [weather].filter(Boolean),
      duration: Array.isArray(duration) ? duration : [duration].filter(Boolean)
  };
  
  console.log("------------ selected workoutss - service -----------------");
  console.log(selectedWorkouts);

  // const query = {
  //     $or: [
  //         { category: { $in: selectedWorkouts.category } },
  //         { whether: { $in: selectedWorkouts.weather } },
  //         { duration: { $in: selectedWorkouts.duration } }
  //     ]
  // };
  const query = {}; // Changed query construction to individual fields
    if (selectedWorkouts.category.length > 0) {
        query.category = { $in: selectedWorkouts.category }; // Added category condition
    }
    if (selectedWorkouts.weather.length > 0) {
        query.weather = { $in: selectedWorkouts.weather }; // Added weather condition
    }
    if (selectedWorkouts.duration.length > 0) {
        query.duration = { $in: selectedWorkouts.duration }; // Added duration condition
    }
  
  console.log("------------ query - service -----------------");
  console.log(query);
  
  const fetchedWorkouts = await Workout.find(query);
  
  console.log("------------ fetchedWorkouts - service -----------------");
  console.log(fetchedWorkouts);
  
  return fetchedWorkouts
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
    GetSelectedWorkouts
    // createWorkout,
    // updateWorkout,
    // deleteWorkout
}