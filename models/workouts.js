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
        "calories": "400"
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
        "calories": "300"
    }
]   

function getAllWorkouts(){
    return workouts
}

module.exports = {
    getAllWorkouts
}