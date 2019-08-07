<<<<<<< HEAD
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



// var locations = [
//       ['Bondi Beach', -33.890542, 151.274856, 4],
//       ['Coogee Beach', -33.923036, 151.259052, 5],
//       ['Cronulla Beach', -34.028249, 151.157507, 3],
//       ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
//       ['Maroubra Beach', -33.950198, 151.259302, 1]
//     ];

//     var map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 10,
//       center: new google.maps.LatLng(-33.92, 151.25),
//       mapTypeId: google.maps.MapTypeId.ROADMAP
//     });

//     var infowindow = new google.maps.InfoWindow();
=======

var myMap

function initMap() {
  var myLatLng = {lat: 40.782710, lng: -73.965310};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: myLatLng
  });

  myMap = map

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
  });

}

$(document).ready(function(){

  var coord1 = new google.maps.LatLng(40.716180,-73.997490)
  addMarker(coord1)
  var coord2 = new google.maps.LatLng(40.721330,-74.012340)
  addMarker(coord2)
  var coord3 = new google.maps.LatLng(40.716290,-73.983770)
  addMarker(coord3)
  var coord4 = new google.maps.LatLng(40.756770,-73.970790)
  addMarker(coord4)
  var coord5 = new google.maps.LatLng(40.764910,-73.985110)
  addMarker(coord5)

  function addMarker(coordinates){
    var marker = new google.maps.Marker({ 
      position: coordinates,
      map: myMap, 
      title: this.LocationName 
    }); 
  }

  function convertLocation(location){
  var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyCkioyz1epNmUDEt2m_AnGPVYsD89b-E3g"
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
      var lat = response.results[0].geometry.location.lat
      var lng = response.results[0].geometry.location.lng
      var coord = new google.maps.LatLng(lat, lng)
      addMarker(coord)
      // console.log(lng)
    })
  }
  convertLocation("106+11th+Street,+Hoboken,+NJ")

})
>>>>>>> 8d1d8ba7f3d07012a8917fecc0ccf02cdcd4e556

//     var marker, i;

//     for (i = 0; i < locations.length; i++) {  
//       marker = new google.maps.Marker({
//         position: new google.maps.LatLng(locations[i][1], locations[i][2]),
//         map: map
//       });

//       google.maps.event.addListener(marker, 'click', (function(marker, i) {
//         return function() {
//           infowindow.setContent(locations[i][0]);
//           infowindow.open(map, marker);
//         }
//       })(marker, i));
//     }