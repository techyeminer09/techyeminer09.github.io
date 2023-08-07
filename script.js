let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '300',
        width: '100%',
        playerVars: {
            'controls': 1,
            'autohide': 1,
            'rel': 0
        }
    });

    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', searchSongs);
}

function searchSongs() {
    const searchQuery = document.getElementById('searchInput').value;
    const apiKey = 'AIzaSyCMHypM-ZJEQcKETgnIGKfNC-m6snP_FcU'; // Replace with your actual YouTube API key
    const maxResults = 5;

    // Construct the API request URL
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&maxResults=${maxResults}&key=${apiKey}`;

    // Fetch search results from YouTube API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data.items);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayResults(results) {
    const searchResultsDiv = document.getElementById('searchResults');
    searchResultsDiv.innerHTML = '';

    results.forEach(result => {
        const videoTitle = result.snippet.title;
        const videoId = result.id.videoId;
        const videoThumbnail = result.snippet.thumbnails.default.url;

        const resultElement = document.createElement('div');
        resultElement.className = 'result';
        resultElement.innerHTML = `
            <img src="${videoThumbnail}" alt="${videoTitle}">
            <p>${videoTitle}</p>
            <button onclick="playSong('${videoId}')">Play</button>
        `;

        searchResultsDiv.appendChild(resultElement);
    });
}

function playSong(videoId) {
    player.loadVideoById(videoId);
}
