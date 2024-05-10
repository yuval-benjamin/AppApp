const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    description : {
        type: String
    },
    time : {
        type: Date,
        required: true
    },
    location : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    supplier : {
        type: String,
        required: true
    },
    calories : {
        type: String,
        required: true
    },
    coordinates: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const Workout = mongoose.model('Workout', workoutSchema, 'workouts');

// function getSearchWorkout(){
//     const serachWorkout = document.getElementById("search-input");
// }

module.exports = Workout; // Export the Workout model

