// import { getAllWorkouts } from '../../models/workouts';

async function generateMap() {
  // const workouts = getAllWorkouts()
  // workout_location = workouts[1].coordinates

  var mapProp= {
    center: new google.maps.LatLng(32.090232, 34.781800),
    zoom: 13
  };
  
  const location = { lat: 32.07260539828965, lng: 34.76606537988191 };
  
  var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
  var marker = new google.maps.Marker({position:location});

  var infowindow = new google.maps.InfoWindow({
    content:"Fem"
    // workouts[1].name
  });
  
  marker.setMap(map);
  infowindow.open(map,marker);
}