var map;
function initMap() {
     var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7549, lng: -73.9840 },
        zoom: 8
    });
}

// function init() {
//     var mapOptions = {
//         center: new google.maps.LatLng(40.7549, -73.9840), mapTypeId: google.maps.mapTypeId.ROADMAP,
//         zoom: 8
//     };
//     var venueMap;
//     venueMap = new google.maps.Map(document.getElementById('map'), mapOptions);
// }

// function loadscript() {

//     var script = document.createElement('script');
//     script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCkioyz1epNmUDEt2m_AnGPVYsD89b-E3g&callback=initializeApp';

//     document.body.appendChild(script);

// }

// window.onload = loadscript;
// var pinLocation = new google.maps.LatLng(40.7536, -73.9832);

// var startPosition = new google.maps.Marker({
//     position: pinLocation,
//     map: map,
//     icon: "img/go.png"

// });
// 40.7549° N, 73.9840° W
// 40.7536, -73.9832//