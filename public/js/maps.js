async function generateMap() {
  
  // This is how it will open the map
  var mapProp = {
    center: new google.maps.LatLng(32.090232, 34.781800),
    zoom: 13
  };

  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  // Create a marker and info window per workout
  workouts.forEach(workout => {
    const [lat, lng] = workout.coordinates.split(',').map(Number);

    var marker = new google.maps.Marker({
      position: { lat, lng },
      map: map
    });

    var infowindow = new google.maps.InfoWindow({
      content: workout.name
    });

    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
  });
}