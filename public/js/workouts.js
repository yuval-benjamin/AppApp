// Get all workouts
async function getAll() {
const res = await fetch('http://localhost/workouts')
const workoutsJs = await res.json()
  
for (let i = 0; i < workoutsJs.length; i++) {
    const element = workoutsJs[i];
  
    let workout = document.getElementById('workoutTemplate').innerHTML
    for (const key in element) {
        workout = workout.replace('{' + key + '}', element[key])
    }
  
    document.getElementsByClassName('workouts')[0].innerHTML += workout
}
}

// Get specific workout
async function getWorkouts(event) {
    event.preventDefault();
    const searchData = document.getElementById('search-input').value;
    const res = await fetch('http://localhost/' + searchData)
    const workoutsJs = await res.json()

    document.getElementsByClassName('workouts')[0].innerHTML = emptyWorkouts

    for (let i = 0; i < workoutsJs.length; i++) {
      const element = workoutsJs[i];
      
      let workout = document.getElementById('workoutTemplate').innerHTML
      for (const key in element) {
          workout = workout.replace('{' + key + '}', element[key])
      }
      
      console.log(workout)
      document.getElementsByClassName('workouts')[0].innerHTML += workout
    }
}


const emptyWorkouts = document.getElementsByClassName('workouts')[0].innerHTML
getAll()
const submitButton = document.querySelector('#search-button');
submitButton.addEventListener('click', getWorkouts);    
