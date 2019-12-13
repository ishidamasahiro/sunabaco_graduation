

function initMap() {

    var lat = parseFloat(document.getElementById( "lat" ).value);//緯度
    var lng = parseFloat(document.getElementById( "lng" ).value);//経度

    //console.log(lat)
    //console.log(lng)

    var place = {lat: lat, lng: lng};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: place
    });
    var marker = new google.maps.Marker({
        position: place,
        map: map
    });
}
