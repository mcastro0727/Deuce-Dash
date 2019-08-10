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
  $("#roomlog").hide();
  $("#readingMat").hide();
}); 

$(document).ready(function () {

  database.ref().on("child_added", function (childSnapshot) {
    var lat = childSnapshot.val().lat
    var lng = childSnapshot.val().lng
    var coord = new google.maps.LatLng(lat, lng)
    addMarker(coord)
  })

  function addMarker(coordinates) {
    var marker = new google.maps.Marker({
      position: coordinates,
      map: myMap,
      title: "address"
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

  function convertLocation(location) {
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
        lng: lng
      })

      addMarker(coord)
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

  var modal = document.getElementById("modal");
  var btn = document.getElementById("myBtn");
  var span = document.getElementsByClassName("close")[0];

  $("#add-button").on("click", function () {
    $(".modal").css("display", "block")

    $("#submit").on("click", function () {
      convertLocation(addPlus($("#address-input").val()))
      $("#address-input").val("")
    })

    $("#cancel").on("click", function () {
      $("#address-input").val("")
    })
  })

  $(".button").on("click", function () {
    modal.style.display = "none";
  })

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }



})


//On Click functions for Navbar. Each one hides whats not on the page and shows what is supposed to be on the specific page. 
$("#map-button").on("click", function hide() {
  $("#roomlog").hide()
  $("#readingMat").hide()
  $("#map").show()
});


$("#reading-button").on("click", function hide() {
  $("#map").hide()
  $("#roomlog").hide()
  $("#readingMat").show()

});

$("#room-log").on("click", function hide() {
  $("#map").hide()
  $("#readingMat").hide()
  $("#roomlog").show()
});



var queryURL = "https://api.nytimes.com/svc/topstories/v2/science.json?api-key=wsP6DVbJDjNI1mKZBsqxLGKeDAxfIOtp"


  $.ajax({
      url: queryURL,
      method: "GET"
  }).done(function(response) {

    console.log(response);

    
      $("#articlesHere").append(response.results["0"].title + "<br>" +"<a href='" + response.results["0"].url + "'>" + response.results["0"].url + "</a>" + "<br>")

      $("#articlesHere").append(response.results["1"].title + "<br>" +"<a href='" + response.results["1"].url + "'>" + response.results["1"].url + "</a>" + "<br>")

      $("#articlesHere").append(response.results["2"].title + "<br>" +"<a href='" + response.results["2"].url + "'>" + response.results["2"].url + "</a>" + "<br>")

      $("#articlesHere").append(response.results["3"].title + "<br>" +"<a href='" + response.results["3"].url + "'>" + response.results["3"].url + "</a>" + "<br>")

      $("#articlesHere").append(response.results["4"].title + "<br>" +"<a href='" + response.results["4"].url + "'>" + response.results["4"].url + "</a>" + "<br>")

      $("#articlesHere").append(response.results["5"].title + "<br>" +"<a href='" + response.results["5"].url + "'>" + response.results["5"].url + "</a>" + "<br>")


  })
