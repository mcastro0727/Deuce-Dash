var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7549, lng: -73.9840},
    zoom: 8
  });
}
// 40.7549° N, 73.9840° W