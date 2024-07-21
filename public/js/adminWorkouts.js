document.addEventListener('DOMContentLoaded', (event) => {
    // Handle delete confirmation and form submission
    document.querySelectorAll('.delete-workout-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const workoutId = event.target.getAttribute('data-workout-id');
            const form = document.getElementById(`delete-workout-form-${workoutId}`);

            if (confirm('Are you sure you want to delete this workout?')) {
                form.submit();
            }
        });
    });
});
