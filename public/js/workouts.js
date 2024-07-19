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
      
      let workout = document.getElementById('workoutTemplate').innerHTML
      for (const key in element) {
          workout = workout.replace('{' + key + '}', element[key])
      }
      
      console.log(workout)
      document.getElementsByClassName('workouts')[0].innerHTML += workout
    }
}

async function buyWorkout(event) {
    const workoutId = event.target.closest('.col').getAttribute('data-id');
    console.log(workoutId);
    // try {
    //     const response = await fetch('/getSessionUsername');
    //     const data = await response.json();
    //     const username = data.username;
    //     console.log(username);
    // } catch (error) {
    //     console.error('Error fetching username:', error);
    // }
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

async function redirectToCart() {
    try {
        const response = await fetch('/getSessionUsername');
        const data = await response.json();
        const username = data.username;
        console.log(username);

        window.location.href = `http://localhost/cart/${username}`;
    } catch (error) {
        console.error('Error fetching username:', error);
    }
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

// Cart listener
document.getElementById('cart-link').addEventListener('click', function(event) {
    event.preventDefault(); 
    redirectToCart();
});

