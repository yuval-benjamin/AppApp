document.addEventListener('DOMContentLoaded', (event) => {
    // document.querySelectorAll('.delete-workout-btn').forEach(button => {
    //     button.addEventListener('click', (event) => {
    //         const workoutId = event.target.getAttribute('data-workout-id');
    //         const form = document.getElementById(`delete-workout-form-${workoutId}`);

    //         if (confirm('Are you sure you want to delete this workout?')) {
    //             form.submit();
    //         }
    //     });
    // });

    document.querySelectorAll('.delete-workout-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
            const workoutId = event.target.getAttribute('data-workout-id');

            if (confirm('Are you sure you want to delete this workout?')) {
                try {
                    const response = await fetch(`/workouts/${workoutId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

                    if (response.ok) {
                        window.location.href = '/adminPage/adminWorkouts';
                    } else {
                        console.error('Failed to delete workout');
                        alert('Failed to delete workout');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred while deleting the workout');
                }
            }
        });
    });

    const updateForm = document.getElementById('update-workout-form');
    if (updateForm) {
        updateForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const form = event.target;
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            const workoutId = document.getElementById('workout-id').value; // Get the workout ID from the hidden input field

            try {
                const response = await fetch(`/workouts/${workoutId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    window.location.href = '/adminPage/adminWorkouts';
                } else {
                    console.error('Failed to update workout');
                    alert('Failed to update workout');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while updating the workout');
            }
        });
    }
});
