document.getElementById('getInfoButton').addEventListener('click', async function() {

    try {
        const response = await fetch('/adminPage/getFollowers');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error.message);
        }
        document.getElementById('responseArea').innerHTML = 'Followers count: ' + data.followers_count;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('responseArea').innerHTML = 'Error: ' + error.message;
    }

});