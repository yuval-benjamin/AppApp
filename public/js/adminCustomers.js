document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.delete-customer-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
            const customerId = event.target.getAttribute('data-customer-id');

            if (confirm('Are you sure you want to delete this customer?')) {
                try {
                    const response = await fetch(`/customers/${customerId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

                    if (response.ok) {
                        window.location.href = '/adminPage/adminCustomers';
                    } else {
                        console.error('Failed to delete customer');
                        alert('Failed to delete customer');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred while deleting the customer');
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
