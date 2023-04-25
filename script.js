// Load Mapbox GL JS
mapboxgl.accessToken = 'YOUR_ACCESS_TOKEN';

// Create a map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11'
});

// Add a listener for the upload button
document.getElementById('upload-button').addEventListener('click', function() {
  // Get the file input
  var fileInput = document.getElementById('file-input');

  // Check if a file was selected
  if (fileInput.files.length === 0) {
    alert('Please select a file to upload.');
    return;
  }

  // Get the file
  var file = fileInput.files[0];

  // Check the file type
  if (file.type !== 'application/json' && file.type !== 'application/geojson' && file.type !== 'application/zip') {
    alert('The file type is not supported.');
    return;
  }

  // Read the file
  var reader = new FileReader();
  reader.onload = function(event) {
    // Get the data
    var data = JSON.parse(event.target.result);

    // Check the data
    if (data.geometry === undefined) {
      alert('The data does not contain a geometry.');
      return;
    }

    // Add the data to the map
    map.addLayer(new mapboxgl.GeoJSON({
      data: data
    }));
  };
  reader.readAsText(file);
});
