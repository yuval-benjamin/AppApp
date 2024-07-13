
// Function to switch tabs
function openTab(tabName) {
    var i;
    var x = document.getElementsByClassName("tab-content");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";

    // Show the "Create Workout" button if on the create-workout tab
    if (tabName === 'create-workout') {
        document.querySelector('.create-workout-btn').style.display = 'block';
    } else {
        document.querySelector('.create-workout-btn').style.display = 'none';
    }
}

// Function to handle form submission for creating workouts
document.getElementById('create-workout-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const workoutData = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/api/workouts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(workoutData),
        });

        if (response.ok) {
            alert('Workout created successfully!');
            event.target.reset();
        } else {
            alert('Failed to create workout.');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});