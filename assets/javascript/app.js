function initMap() {
  var myLatLng = {lat: 40.782710, lng: -73.965310};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    // title: 'Hello World!'
  });
}

var latlng = new google.maps.LatLng(40.782710, -73.965310);

function addmarker(latilongi) {
    var marker = new google.maps.Marker({
        position: latilongi,
        title: 'new marker',
        draggable: true,
        map: map
    });
    map.setCenter(marker.getPosition())
}

$('#btnaddmarker').on('click', function() {
    addmarker(latlng)
})