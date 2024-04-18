// Fetch data and call functions
fetch("https://t3ogxvus80.execute-api.us-east-1.amazonaws.com/musicData")
  .then(response => response.json())
  .then(data => {
    // Initialize genre dropdown
    const genreSelect = document.getElementById('genreSelect');
    genreSelect.addEventListener('change', () => onGenreChange(data));
    // Initialize artist dropdown
    const artistSelect = document.getElementById('artistSelect');
    artistSelect.addEventListener('change', () => onArtistChange(data));
    // Initial table generation
    onGenreChange(data);
  });


function generateTable(data, genre) {
  const artists = Object.keys(data[genre]);
  let tableHTML = '<table><tr><th>Artist</th><th>Album</th><th>Year</th><th>In Stock</th></tr>';

  artists.forEach(artist => {
    const albums = data[genre][artist].albums;
    albums.forEach(album => {
      tableHTML += `<tr><td>${artist}</td><td>${album.name}</td><td>${album.year}</td><td>${album.in_stock}</td></tr>`;
    });
  });

  tableHTML += '</table>';
  return tableHTML;
}

// Function to handle dropdown change
function onGenreChange(data) {
  const genre = document.getElementById('genreSelect').value;
  const tableContainer = document.getElementById('tableContainer');
  tableContainer.innerHTML = generateTable(data, genre);
  console.log("Genre changed to:", genre);
}

// Function to populate the artist dropdown based on selected genre
function populateArtistDropdown(data, genre) {
  const artists = Object.keys(data[genre]);
  const artistSelect = document.getElementById('artistSelect');
  artistSelect.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Select';
  artistSelect.appendChild(defaultOption);

  artists.forEach(artist => {
    const option = document.createElement('option');
    option.value = artist;
    option.textContent = artist;
    artistSelect.appendChild(option);
  });
}

// Function to handle genre change
function onGenreChange(data) {
  const genre = document.getElementById('genreSelect').value;
  populateArtistDropdown(data, genre);
  onArtistChange(data);
}

// Function to handle artist change
function onArtistChange(data) {
  const genre = document.getElementById('genreSelect').value;
  const artist = document.getElementById('artistSelect').value;
  const tableContainer = document.getElementById('tableContainer');

  if (!artist || artist === 'Select') {
    // Generate table for ALL artists in selected genre
    let tableHTML = '<table><tr><th>Artist</th><th>Album</th><th>Year</th><th>Amount In Stock</th></tr>';
    Object.keys(data[genre]).forEach(artist => {
      data[genre][artist].albums.forEach(album => {
        tableHTML += `<tr><td>${artist}</td><td>${album.name}</td><td>${album.year}</td><td>${album.in_stock}</td></tr>`;
      });
    });
    tableHTML += '</table>';
    tableContainer.innerHTML = tableHTML;
  } else {
    // Filter albums for selected artist
    const artistData = data[genre][artist];
    let tableHTML = '<table><tr><th>Album</th><th>Year</th><th>Song Titles</th><th>Amount In Stock</th></tr>';
    artistData.albums.forEach(album => {
      const songList = album.tracks.map(track => `<li>${track.name}</li>`).join('');
      tableHTML += `<tr><td>${album.name}</td><td>${album.year}</td><td>${songList ? `<ul>${songList}</ul>` : '-'}</td><td>${album.in_stock}</td></tr>`;
    });
    tableHTML += '</table>';
    tableContainer.innerHTML = tableHTML;
  }
}

function myFunction() {
  var root = document.documentElement;

  if (document.getElementById("darkmode-toggle").checked) {
    // enable dark mode
    root.style.setProperty("--primary", "#1E1E24"); //black
    root.style.setProperty("--secondary", "#FFF8F0"); //white
    root.style.setProperty("--accent", "#A40000"); //red
    root.style.setProperty("--primary-rgb", "30, 30, 36"); //black
    root.style.setProperty("--secondary-rgb", "255, 248, 240"); //white
    root.style.setProperty("--accent-rgb", "164, 0, 0"); //red
  } else {
    // disable dark mode, enable light mode
    root.style.setProperty("--primary", "#FFF8F0"); //white
    root.style.setProperty("--secondary", "#1E1E24"); //black
    root.style.setProperty("--accent", "#A40000"); //red
    root.style.setProperty("--primary-rgb", "255, 248, 240"); //white
    root.style.setProperty("--primary-rgb", "30, 30, 36"); //black
    root.style.setProperty("--primary-rgb", "164, 0, 0"); //red
  }
}

