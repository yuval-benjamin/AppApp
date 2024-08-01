document.addEventListener('DOMContentLoaded', (event) => {
    fetch('/is-admin')
      .then(response => response.json())
      .then(data => {
        if (data.isAdmin) {
          document.getElementById('admin-button').style.display = 'block';
        }
      })
      .catch(error => console.error('Error fetching admin status:', error));
  });

  async function redirectToCart() {
    try {
        const response = await fetch('/getSessionUsername');
        const data = await response.json();
        const username = data.username;

        window.location.href = `/cart/${username}`;
    } catch (error) {
        console.error('Error fetching username:', error);
    }
}

// Cart listener
document.getElementById('cart-link').addEventListener('click', function(event) {
  event.preventDefault(); 
  redirectToCart();
});