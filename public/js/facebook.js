document.getElementById('postButton').addEventListener('click', function() {
    const message = document.getElementById('postContent').value;
    fetch('https://graph.facebook.com/v12.0/335781382944543/feed', {  // Replace {page-id} with the actual page ID
        method: 'POST',
        headers: {
            'Authorization': 'Bearer EABqZBKGcCv3QBOZB2CNGhe7ZBTZAhJneO4Np6iq9mZAghFeovEosjWiD0mKp0DQJ2qH5fs5SsyyO8U5pLrF9H5p4R8z8mZCRUSweMDuQLji81YnNZBpsQbEGKVs7rIE9GfZAIgulRcRjZCBzwYTOL5SoUzV2ZBDlWIVcrBiZAQFZBY8NZAH0xuLvzoB4ve4SrxgSwa5EznX88kBcpcyPicOH9UQPeGqBS63y33W5VRcwZD'  // Replace YOUR_ACCESS_TOKEN with the actual token
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
            'Authorization': 'Bearer EABqZBKGcCv3QBO7ZA2uZCFHoHDullGPPCeLxrFohFl219tmwXn9NT4esoqnwnjY6r9gfuqZA0adqVtziserAFNxoPvkFPCJSFdV2WnfurMw0nz9V2vBoG2jRP4K3e6sfYrSuWou5ZBGjGUB5ZBglvmi501pBsPAQvXQmjXGHZCwRnQkOExscGmfptu7zZCe7bVZCh'  // Replace YOUR_ACCESS_TOKEN with the actual token
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

// // Add event listener to the get info button for fetching followers count
// document.getElementById('getInfoButton').addEventListener('click', function() {
//     fetch('https://graph.facebook.com/v12.0/335781382944543?fields=followers_count', { 
//         method: 'GET',
//         headers: {
//             'Authorization': 'Bearer EABqZBKGcCv3QBOZBN2YcnI6qhsv8ZCrwoJ4IqZCmwn89o3hm36oxbCuhsZC4HZAMGwZAlBDBQHYCQCY3IWfIuXmlkaUHAhZBGmDHl5ZAdoUAZCEjgeFvWXQ4FJYZBhpC2ztzcjZAmbBQ662YnZAcNJFe7DsS1ZCYSKMPljNxdUBLoYw81WEYRldQDLkHkbaKfQWENKyjKuWN0FfCu6O9PizSwAT3cXHAbIoGhJCIG5BoeS'  // Replace YOUR_ACCESS_TOKEN with the actual token
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         document.getElementById('responseArea').innerHTML = 'Followers count: ' + data.followers_count;
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// });


