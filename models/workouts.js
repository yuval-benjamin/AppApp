const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    coordinates: {
        type: String,
        required: true
    }
});

const Workout = mongoose.model('Workout', workoutSchema, 'workouts');
module.exports = Workout; // Export the Workout model