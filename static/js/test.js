function attachMessage(marker) {
    google.maps.event.addListener(marker, 'click', function() {
        new google.maps.Geocoder().geocode({
        latLng: marker.getPosition()
        }, function(result, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            new google.maps.InfoWindow({
            content: result[0].formatted_address
            }).open(marker.getMap(), marker);
        }
        });
    });
}

var data = new Array();
data.push(new google.maps.LatLng(35.697745, 139.826395));
data.push(new google.maps.LatLng(35.700295, 139.833692));
data.push(new google.maps.LatLng(35.707055, 139.831897));
data.push(new google.maps.LatLng(35.710127, 139.828033));
data.push(new google.maps.LatLng(35.717753, 139.816786));

var myMap = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: new google.maps.LatLng(35.71, 139.83),
    scrollwheel: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
});
for (i = 0; i < data.length; i++) {
    var myMarker = new google.maps.Marker({
        position: data[i],
        map: myMap
    });
    attachMessage(myMarker);
}