async function deleteFromCart(workoutId) {
    try {
        // Send API request to remove workout from cart
        const deleteResponse = await fetch('/cart/deleteWorkoutFromCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ workoutId: workoutId })
        });

        if (deleteResponse.ok) {
            redirectToCart()
        } else {
            console.error('Failed to remove workout from cart');
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

        window.location.href = `http://localhost/cart/${username}`;
    } catch (error) {
        console.error('Error fetching username:', error);
    }
}

async function confirmOrder() {
    try {

        const createOrder = await fetch('/orders/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!createOrder.ok) {
            console.error('Failed to create order');
            return
        }

        // Send API request to remove workout from cart
        const deleteResponse = await fetch('/cart/deleteAllWorkoutsFromCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });


        if (deleteResponse.ok) {
            redirectToCart()
        } else {
            console.error('Failed to remove workout from cart');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Delete Listener
document.querySelectorAll('.delete-icon').forEach(icon => {
    icon.addEventListener('click', function(event) {
        event.preventDefault(); 
        const workoutId = event.target.closest('.delete-btn').getAttribute('data-id');
        deleteFromCart(workoutId);
    });
});

// Checkout Listener
const submitButton = document.querySelector('#checkout-button');
submitButton.addEventListener('click', confirmOrder);  
