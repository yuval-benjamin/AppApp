document.getElementById('postButton').addEventListener('click', function() {
    const message = document.getElementById('postContent').value;
    fetch('https://graph.facebook.com/v12.0/335781382944543/feed', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + process.env.FACEBOOK_TOKEN
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('responseArea').innerHTML = 'Post ID: ' + data.id;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('getInfoButton').addEventListener('click', function() {
    fetch('https://graph.facebook.com/v12.0/335781382944543?fields=followers_count', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer {ACCESS_TOKEN}'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            throw new Error(data.error.message);
        }
        document.getElementById('responseArea').innerHTML = 'Followers count: ' + data.followers_count;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('responseArea').innerHTML = 'Error: ' + error.message;
    });
});