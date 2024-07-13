// Get all workouts
async function getAll() {
const res = await fetch('http://localhost/workouts')
const workoutsJs = await res.json()

document.getElementsByClassName('workouts')[0].innerHTML = emptyWorkouts

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

// Get selected workout
document.querySelectorAll('.sub-options input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', async function() {
        const selectedWorkouts = {
            category: [],
            weather: [],
            duration: []
        };

        document.querySelectorAll('#categoryOptions input[type="checkbox"]:checked').forEach(function(checkbox) {
            selectedWorkouts.category.push(checkbox.value);
        });
        document.querySelectorAll('#weatherOptions input[type="checkbox"]:checked').forEach(function(checkbox) {
            selectedWorkouts.weather.push(checkbox.value);
        });
        document.querySelectorAll('#durationOptions input[type="checkbox"]:checked').forEach(function(checkbox) {
            selectedWorkouts.duration.push(checkbox.value);
        });

        const queryString = Object.keys(selectedWorkouts).map(key => {
            return selectedWorkouts[key].map(value => `${key}=${encodeURIComponent(value)}`).join('&');
        }).filter(query => query).join('&');

        const response = await fetch(`/selectedWorkouts?${queryString}`);
        const workoutsJs = await response.json();
        console.log(workoutsJs);

        if (workoutsJs.length == 0){
            console.log(workoutsJs)
            getAll()
        }
        else {
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
        
    });
});

const emptyWorkouts = document.getElementsByClassName('workouts')[0].innerHTML
getAll()
const submitButton = document.querySelector('#search-button');
submitButton.addEventListener('click', getWorkouts);    
