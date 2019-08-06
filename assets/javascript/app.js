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
    var mapOptions = {
        center: {
            lat: 40.7549, lng: -73.9840
        },
        zoom: 8,
    };
    var map;
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

};

var pinLocation = new.google.maps.LatLng(40.782710,-73.965310);

var startPosition = new.google.maps.Marker({
    position: pinLocation,
    map: map,
    icon: "assets/images/marker.png"
});