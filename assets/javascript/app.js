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