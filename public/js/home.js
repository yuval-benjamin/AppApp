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