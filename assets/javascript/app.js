<<<<<<< HEAD
// $(function () {

//     function initMap() {

//         var location = new google.maps.LatLng(40.7549, -73.9840);

//         var mapCanvas = document.getElementById('map');
//         var mapOptions = {
//             center: location,
//             zoom: 8,
//             panControl: false,
//             mapTypeId: google.maps.MapTypeId.ROADMAP
//         }
//         var map = new google.maps.Map(mapCanvas, mapOptions);
//     }
//     google.maps.venet.addDomListener(window, 'load', initMap);
// });


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



// function initMap() {
//     var mapOptions = {
//         center: {
//             lat: 40.7549, lng: -73.9840

//         },
//         zoom: 8,
//     };
//     var map;
//     map = new google.maps.Map(document.getElementById('map'), mapOptions);

//     var marker = new google.maps.Marker({
//         position: myLatLng,
//         map: map,
// });




// var pinLocation = new.google.maps.LatLng(40.782710,-73.965310);

// var startPosition = new.google.maps.Marker({
//     position: pinLocation,
//     map: map,
//     icon: "assets/images/marker.png"
// });
=======
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 40.7549,
            lng: -73.9840
        },
        zoom: 8
    });
}


            // var pinLocation = new google.maps.LatLng(40.7536, -73.9832);

            // var startPosition = new google.maps.Marker({
            //     position: pinLocation,
            //     map: map,
            //     icon: "img/go.png"

            // });
            // 40.7549° N, 73.9840° W
            // 40.7536, -73.9832//
>>>>>>> 8023dbb7fafe678cd54e69f5523995c138e62193
