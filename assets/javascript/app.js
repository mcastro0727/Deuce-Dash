var config = {
  apiKey: "AIzaSyAn5NoP9LgIzSdhe8-H_zmBhAUOxWz7Huc",
  authDomain: "deuce-dash.firebaseapp.com",
  databaseURL: "https://deuce-dash.firebaseio.com",
  storageBucket: "deuce-dash.appspot.com"
}

firebase.initializeApp(config);

var database = firebase.database();
var myMap

function initMap() {
  var myLatLng = {
    lat: 40.782710,
    lng: -73.965310
  };

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: myLatLng
  })

  myMap = map


}

$(document).ready(function () {

  database.ref().on("child_added", function (childSnapshot) {
    var lat = childSnapshot.val().lat
    var lng = childSnapshot.val().lng
    var address = childSnapshot.val().address
    var coord = new google.maps.LatLng(lat, lng)
    addMarker(coord, address)
  })

  function addMarker(coordinates, address) {
    var marker = new google.maps.Marker({
      position: coordinates,
      map: myMap,
      title: address
    })
    marker.addListener('click', function () {
      if (myMap.getZoom() == 12) {
        myMap.setZoom(15)
        myMap.setCenter(marker.getPosition())
      }
      else if(myMap.getZoom() == 15){
        myMap.setZoom(18)
        myMap.setCenter(marker.getPosition())
      }
      else {
        myMap.setZoom(12)
        myMap.setCenter(marker.getPosition())
      }
    })
  }

  function convertLocation(location, address) {
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyCkioyz1epNmUDEt2m_AnGPVYsD89b-E3g"
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      var lat = response.results[0].geometry.location.lat
      var lng = response.results[0].geometry.location.lng
      var coord = new google.maps.LatLng(lat, lng)

      database.ref().push({
        lat: lat,
        lng: lng,
        address: address
      })

      addMarker(coord, address)
    })
  }

  function addPlus(string) {
    stringArray = string.split(" ")
    var stringPlus = stringArray[0]
    for (i = 1; i < stringArray.length; i++) {
      stringPlus = stringPlus + "+" + stringArray[i]
    }
    return (stringPlus)
  }

  function capitalizeWords(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  var modal = document.getElementById("modal");
  var btn = document.getElementById("myBtn");
  var span = document.getElementsByClassName("close")[0];

  $("#add-button").on("click", function () {
    $(".modal").css("display", "block")
    $("#address-input").focus()

    $("#submit").on("click", function () {
      convertLocation(addPlus($("#address-input").val()), capitalizeWords($("#address-input").val()))
      $("#address-input").val("")
    })

    $("#cancel").on("click", function () {
      $("#address-input").val("")
    })
  })

  $(".button").on("click", function () {
    $("#modal").fadeOut()
  })

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

})