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

    const updateForm = document.getElementById('update-customer-form');
    if (updateForm) {
        updateForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const form = event.target;
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            const customerId = document.getElementById('customer-id').value; // Get the customer ID from the hidden input field

            try {
                const response = await fetch(`/customers/${customerId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    window.location.href = '/adminPage/adminCustomers';
                } else {
                    console.error('Failed to update customer');
                    alert('Failed to update customer');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while updating the customer');
            }
        });
    }
});
