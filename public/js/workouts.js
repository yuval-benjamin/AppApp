// Fetch and display all workouts
async function getAll() {
    const res = await fetch('http://localhost/workouts')
    const workoutsJs = await res.json()

    displayWorkouts(workoutsJs)
}

// Fetch and display specific workouts based on search input and selected filters
async function getWorkouts(event) {
    event.preventDefault();
    const searchData = document.getElementById('search-input').value;

    uncheckCheckboxes()

    if (!searchData){
        await fetchSelectedWorkouts(); 
    }
    else {
        const res = await fetch('http://localhost/workouts/' + searchData)
        const workoutsJs = await res.json()

        displayWorkouts(workoutsJs)
    }
}

// Get selected workouts
function getSelectedWorkouts() {
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

    return queryString;
}

async function fetchSelectedWorkouts() {
    const queryString = getSelectedWorkouts();

    if (!queryString){
        getAll()
    }
    else {
        const response = await fetch(`/workouts/selectedWorkouts?${queryString}`);
        const workoutsJs = await response.json();

        displayWorkouts(workoutsJs)
    }
}

function displayNoResults(){
    var noResults = document.getElementById('noResults');
    noResults.style.display = 'block';
}

function removeNoResults(){
    var noResults = document.getElementById('noResults');
    noResults.style.display = 'none';
}

function displayWorkouts(workoutsJs) {

    if (workoutsJs.length == 0) {
        displayNoResults()
    }
    else {
        removeNoResults()
    }

    document.getElementsByClassName('workouts')[0].innerHTML = emptyWorkouts
    
    for (let i = 0; i < workoutsJs.length; i++) {
        const element = workoutsJs[i];
        
        if (typeof element.time === 'string' && !isNaN(Date.parse(element.time))) {
            const date = new Date(element.time);
            const day = date.getDate();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            element.time = `${hours}:${minutes} ${day}/${month}/${year}`;
        }
      
      let workout = document.getElementById('workoutTemplate').innerHTML
      for (const key in element) {
          workout = workout.replace('{' + key + '}', element[key])
      }
      
      document.getElementsByClassName('workouts')[0].innerHTML += workout
    }
}

async function buyWorkout(event) {
    const workoutId = event.target.closest('.col').getAttribute('data-id');
    try {
        const addToCartResponse = await fetch('/cart/addWorkoutToCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ workoutId: workoutId })
        });
        if (addToCartResponse.ok) {
            console.log('Workout added to cart successfully');
        } else {
            console.error('Failed to add workout to cart');
        }
    } catch (error) {
        console.error('Error:', error);
    }

}

function uncheckCheckboxes() {
    // Get all checkboxes within the dropdown
    var checkboxes = document.querySelectorAll('.dropdown input[type="checkbox"]');

    // Loop through each checkbox and uncheck it
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
}


// Initialize by fetching all workouts
getAll()

// emptyWorkouts template
const emptyWorkouts = document.getElementsByClassName('workouts')[0].innerHTML

// Search button listener
const submitButton = document.querySelector('#search-button');
submitButton.addEventListener('click', getWorkouts);


// Checkbox listener
document.querySelectorAll('.sub-options input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', async function() {
        await fetchSelectedWorkouts(); 
    });
});

// Buy button listener
document.querySelector('.workouts').addEventListener('click', function(event) {
    if (event.target && event.target.matches('.buy-button')) {
        buyWorkout(event);
    }
});


