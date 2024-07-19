async function deleteFromCart(workoutId) {
    try {
        const response = await fetch('/getSessionUsername');
        const data = await response.json();
        const username = data.username;
        console.log("delete");

        // Send API request to remove workout from cart
        // const deleteResponse = await fetch('/api/removeFromCart', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ username: username, workoutId: workoutId })
        // });

        // if (deleteResponse.ok) {
        //     console.log('Workout removed from cart successfully');
        //     // Optionally, remove the item from the DOM
        //     document.querySelector(`.cart-item[data-id="${workoutId}"]`).remove();
        // } else {
        //     console.error('Failed to remove workout from cart');
        // }
    } catch (error) {
        console.error('Error:', error);
    }
}


// Delete Listener
document.querySelectorAll('.delete-icon').forEach(icon => {
    icon.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default action
        const workoutId = event.target.closest('.cart-item').getAttribute('data-id');
        deleteFromCart(workoutId);
    });
});