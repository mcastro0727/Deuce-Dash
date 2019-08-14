var email
var password
var isLoggedIn = false
var addModal = $("#add-modal")
var signUpModal = $("#sign-up-modal")
var errorCode
var today = new Date()


var config = {
  apiKey: "AIzaSyAn5NoP9LgIzSdhe8-H_zmBhAUOxWz7Huc",
  authDomain: "deuce-dash.firebaseapp.com",
  databaseURL: "https://deuce-dash.firebaseio.com",
  storageBucket: "deuce-dash.appspot.com",
  projectId: "deuce-dash"
}

firebase.initializeApp(config)
var database = firebase.database()
var db = firebase.firestore()
var auth = firebase.auth()
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

firebase.auth().onAuthStateChanged(function (firebaseUser) {
  if (firebaseUser) {
    console.log(firebaseUser)
  }
  else {
    console.log('not logged in')
  }
})

$(document).ready(function () {
  $("#roomlog").hide();
  $("#readingMat").hide();
});

$(document).ready(function () {

  database.ref().on("child_added", function (childSnapshot) {
    var lat = childSnapshot.val().lat
    var lng = childSnapshot.val().lng
    var address = childSnapshot.val().address
    var coord = new google.maps.LatLng(lat, lng)
    addMarker(coord, address)
  })

  function addMarker(coordinates, address) {
    address = removePlus(address)
    var emoji = 'assets/images/poop.png'
    var marker = new google.maps.Marker({
      position: coordinates,
      map: myMap,
      title: address,
      animation: google.maps.Animation.DROP,
      icon: emoji

      // animation: google.maps.Animation.DROP,
      // icon: emoji,
    })

    marker.addListener('click', function () {
      var address = $("#comment-header")
      var comments = $("#comment-box")
      var reviews = $("#review-comments")
      document.getElementById("comment-box").disabled=false
      document.getElementById("new-comment-btn").disabled=false

      $("#comment-box").focus()
      address.empty()
      comments.empty()
      reviews.empty()
      address.text(this.title)





      db.collection("reviews").where("address", "==", address.text()).orderBy("timeStamp").get()
        .then(function (snapshot) {
          console.log(snapshot.docs)

          snapshot.docs.forEach(function (doc) {
            console.log(doc.data().address)
            var comment = $("<div class='comment'>")
            var email = $("<div class='user'>")
            var timeDiv = $("<div class='time'>")
            timeDiv.text(doc.data().date + " @ " + doc.data().time)
            comment.text(doc.data().comment)
            email.text(doc.data().email)
            $("#review-comments").prepend("<br>")
            $("#review-comments").prepend(comment)
            $("#review-comments").prepend(email)
            $("#review-comments").prepend(timeDiv)


          })
        })
    })
  }

  function convertLocation(location) {
    location = addPlus(location)
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyCkioyz1epNmUDEt2m_AnGPVYsD89b-E3g"

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var lat = response.results[0].geometry.location.lat
        var lng = response.results[0].geometry.location.lng
        var coord = new google.maps.LatLng(lat, lng)

        database.ref().push({
          lat: lat,
          lng: lng,
          address: location
        })

      location = addPlus(location)
      addMarker(coord, location)
    })
  }


  function register() {
    email = $("#input-email").val()
    password = $("#input-password").val()
    var user = auth.currentUser
    var promise = auth.createUserWithEmailAndPassword(email, password)
    isLoggedIn = true

    promise.catch(function (e) {
      errorCode = e.code
      console.log(errorCode)
      isLoggedIn = false
    })
      .then(function () {

        if (errorCode == "auth/invalid-email") {
          $("#modal-title").text("Invalid email.")
          $("#register-text").text("email address is not valid.")
          $("sign-up-modal").css("display", "block")
        }

        if (errorCode == "auth/invalid-password") {
          $("#modal-title").text("Email address already registered.")
          $("#register-text").text("You already have an account.")
          $("sign-up-modal").css("display", "block")
        }

        if (isLoggedIn) {

          db.collection("users").doc(user.uid).set({
            email: email
          })
            .then(function () {
              console.log("Document successfully written!");
            })
            .catch(function (error) {
              console.error("Error writing document: ", error);
            })


        $("#log-in-link-text").text("Log-out")
        $("#input-email").val("")
        $("#input-password").val("")
        $("#login-form").css("display","none")
        $("#map").css("display","block")
        $("#review-form").css("display","block")
      }
    })
  }

  function addPlus(string) {
    
    var stringArray = string.split("+")
    var stringPlus = stringArray[0]

    for (i = 1; i < stringArray.length; i++) {
      stringPlus = stringPlus + "+" + stringArray[i]
    }
    return (stringPlus)
  }

  function removePlus(string) {
    
    var stringArray = string.split("+")
    var stringMinus = stringArray[0]

    for (i = 1; i < stringArray.length; i++) {
      stringMinus = stringMinus + " " + stringArray[i]
    }
    return (stringMinus)
  }
  
  function capitalizeWords(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  window.onclick = function (event) {

    if (event.target == addModal) {
      modal.style.display = "none";
    }
  }

  function logInSignUpBtnClick() {
    $("#input-email").val("")
    $("#input-password").val("")
    $("#login-form").css("display","none")
    $("#map").css("display","block")
    $("#review-form").css("display","block")
  }

  $("#login-link").on("click", function(){
    $("#map").css("display","none")
    $("#review-form").css("display","none")
    $("#login-form").css("display","block")
    $("#display").css("background", "grey")
  })

  if (isLoggedIn) {
    $("#log-in-link-text").text("Log-out")
  }
  else {
    $("#log-in-link-text").text("Log-in")
  }

  $("#login-btn").on("click", function () {
    email = $("#input-email").val()
    password = $("#input-password").val()

    var promise = auth.signInWithEmailAndPassword(email, password)
    isLoggedIn = true

    promise.catch(function (e) {
      errorCode = e.code
      console.log(errorCode)
      isLoggedIn = false
    })
      .then(function () {

        if (errorCode == "auth/wrong-password") {
          $("#modal-title").text("Incorrect password.")
          $("#register-text").text("")

          $("#reg-cancel-btn").on("click", function () {
            signUpModal.css("display", "none")
          })

          $("#reg-ok-btn").on("click", function () {
            $("#sign-up-modal").css("display", "none")
          })
        }

        if (errorCode == "auth/user-not-found") {
          $("#modal-title").text("Account not found.")
          $("#register-text").text("Register account now?")

          $("#reg-cancel-btn").on("click", function () {
            signUpModal.css("display", "none")
            $("#input-email").val("")
            $("#input-password").val("")
          })

          $("#reg-ok-btn").on("click", function () {
            register()
            $("#sign-up-modal").css("display", "none")
            $("#log-in-link-text").text("Log-out")
          })
        }

        if (isLoggedIn) {
          $("#log-in-link-text").text("Log-out")
          logInSignUpBtnClick()
        }
        else {
          signUpModal.css("display", "block")
        }
      })
  })


  $("#sign-up-btn").on("click", function () {
    register()
  })

  $("#new-comment-btn").on("click", function () {
    var commentDiv = $("<div class='comment'>")
    var userDiv = $("<div class='user'>")
    var timeDateDiv = $("<div class='time'>")
    var address = $("#comment-header").text()
    var hours = today.getHours()
    var mins = today.getMinutes()
    var amPM = "AM"
    var month = today.getMonth()
    var day = today.getDate()
    var timeStampHour = hours

    if (hours < 10) {
      timeStamphour = "0" + hours
    }

    if (day < 10) {
      day = "0" + day
    }

    if (month < 10) {
      month = "0" + month
    }

    if (today.getMinutes() < 10) {
      mins = "0" + mins
    }

    if (today.getHours() > 12) {
      hours = hours - 12
      amPM = "PM"
    }
    else if (today.getHours() == 0) {
      hours = 12
    }

    var time = hours + ":" + mins + " " + amPM
    var date = (today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear()
    var timeStamp = "" + today.getFullYear() + month + day + timeStampHour + mins
    console.log(timeStamp)
    userDiv.text(auth.currentUser.email)
    commentDiv.text($("#comment-box").val())
    timeDateDiv.text(date + " @ " + time)
    $("#review-comments").prepend("<br>")
    $("#review-comments").prepend(commentDiv)
    $("#review-comments").prepend(userDiv)
    $("#review-comments").prepend(timeDateDiv)

    db.collection("reviews").add({
      email: email,
      comment: $("#comment-box").val(),
      address: address,
      time: time,
      date: date,
      timeStamp: timeStamp
    })

    $("#comment-box").val("")
    $("#comment-box").focus()
  })

  $("#add-new-loc-link").on("click", function () {

    if (isLoggedIn) {
      addModal.css("display", "block")
      $("#address-input").focus()

      $("#submit-new-loc-btn").on("click", function () {
        var address = capitalizeWords($("#address-input").val())
        convertLocation(address)
        $("#address-input").val("")
        addModal.css("display", "none")
    })

      $("#cancel-new-loc-btn").on("click", function () {
        $("#address-input").val("")
        addModal.css("display", "none")
      })
    }
  })

  $(".new-location-btn").on("click", function () {
    addModal.fadeOut(200)
  })

  convertLocation("168-02 P.O Edward Byrne Ave.")
  convertLocation("64-2 Catalpa Avenue")
  convertLocation("92-08 222nd Street")

})

firebase.auth().onAuthStateChanged(function (firebaseUser) {
  if (firebaseUser) {
    console.log(firebaseUser)
  }
  else {
    console.log('not logged in')
  }
});

//On Click functions for Navbar. Each one hides whats not on the page and shows what is supposed to be on the specific page. 
$("#map-button").on("click", function hide() {
  $("#display").show()
  $("#readingMat").hide()
  $("#map").show()
  $("#display").show()
  $("#review-form").show()
});


$("#reading-button").on("click", function hide() {
  $("#map").hide()
  $("#readingMat").show()
  $("#display").hide()
<<<<<<< HEAD
=======
  $("#review-form").css("display","none")
});

$("#room-log").on("click", function hide() {
  $("#map").hide()
  $("#readingMat").hide()
  $("#roomlog").show()
  $("#review-form").css("display","block")
>>>>>>> e4e7b2a92690cbc60270b5a2b88e5bb95820db9c
});



var queryURL = "https://api.nytimes.com/svc/topstories/v2/science.json?api-key=wsP6DVbJDjNI1mKZBsqxLGKeDAxfIOtp"


$.ajax({
  url: queryURL,
  method: "GET"
}).done(function (response) {

  console.log(response);


  $("#articlesHere").append(response.results["0"].title + "<br>" + "<a href='" + response.results["0"].url + "' target='_blank'>" + response.results["0"].url + "</a>" + "<br>")

  $("#articlesHere").append(response.results["1"].title + "<br>" + "<a href='" + response.results["1"].url + "' target='_blank'>" + response.results["1"].url + "</a>" + "<br>")

  $("#articlesHere").append(response.results["2"].title + "<br>" + "<a href='" + response.results["2"].url + "' target='_blank'>" + response.results["2"].url + "</a>" + "<br>")

  $("#articlesHere").append(response.results["3"].title + "<br>" + "<a href='" + response.results["3"].url + "' target='_blank'>" + response.results["3"].url + "</a>" + "<br>")

  $("#articlesHere").append(response.results["4"].title + "<br>" + "<a href='" + response.results["4"].url + "' target='_blank'>" + response.results["4"].url + "</a>" + "<br>")

  $("#articlesHere").append(response.results["5"].title + "<br>" + "<a href='" + response.results["5"].url + "' target='_blank'>" + response.results["5"].url + "</a>" + "<br>")

});

