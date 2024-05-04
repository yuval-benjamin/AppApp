const workouts = [
    {
        "id" : 1,
        "name": "Tennis class with yuval",
        "description": "An hour and a half with the best instructor in town.",
        "time": "10:30",
        "location": "Tel Aviv",
        "price": "100",
        "category": "Court",
        "supplier": "Yuval",
        "calories": "400",
        "coordinates": "32.072272706625505, 34.7888754788972",
        "image": "tennis.jpg"
    },
    {
        "id" : 1,
        "name": "Surf lesson",
        "description": "Surfboard rental for 2 hours",
        "time": "7:00",
        "location": "Tel Aviv",
        "price": "150",
        "category": "Water",
        "supplier": "Fem",
        "calories": "300",
        "coordinates": "32.07260539828965,34.76606537988191",
        "image": "surf.jpg"
        
    }
]  

function getAllWorkouts(){
    return workouts
}

// function getAllWorkoutCoordinates(){
//     const coordinates = workouts.map(workout => workout.coordinates);
//     return coordinates
// }

module.exports = {
    getAllWorkouts,
    // getAllWorkoutCoordinates
}
