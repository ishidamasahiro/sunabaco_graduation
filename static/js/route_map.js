let latlng;
let map;
let bounds;

let zoomlat;
let zoomlng;
let latLngzoom;

let temple_marker = [];
let temple_name = [];
let temple_number = [];
let temple_information = [];
let temple_lat = [];
let temple_lng = [];
let temple_latlng = [];
let temple_information_html = [];
let temple_infoWindow = [];

let startlat = [];
let startlng = [];
let goallat = [];
let goallng = [];


let waypoints_points = [];
let waypoints_temple_lat = [];
let waypoints_temple_lng = [];

let waypoints_temple_marker = [];
let waypoints_temple_information_html = [];
let waypoints_temple_infoWindow = [];


//ルート中の物件
let SandG_gourmet_marker = [];
let SandG_gourmet_information_html = [];
let SandG_gourmet_infoWindow = [];
let SandG_gourmet_name = [];
let SandG_gourmet_information = [];
let SandG_gourmet_lat = [];
let SandG_gourmet_lng = [];
let SandG_gourmet_phone_number = [];

let route_gourmet_marker = [];
let route_gourmet_information_html = [];
let route_gourmet_infoWindow = [];
let route_gourmet_name = [];
let route_gourmet_information = [];
let route_gourmet_lat = [];
let route_gourmet_lng = [];
let route_gourmet_phone_number = [];

let SandG_inn_marker = [];
let SandG_inn_information_html = [];
let SandG_inn_infoWindow = [];
let SandG_inn_name = [];
let SandG_inn_information = [];
let SandG_inn_lat = [];
let SandG_inn_lng = [];
let SandG_inn_phone_number = [];

let route_inn_marker = [];
let route_inn_information_html = [];
let route_inn_infoWindow = [];
let route_inn_name = [];
let route_inn_information = [];
let route_inn_lat = [];
let route_inn_lng = [];
let route_inn_phone_number = [];

let SandG_roadside_station_marker = [];
let SandG_roadside_station_information_html = [];
let SandG_roadside_station_infoWindow = [];
let SandG_roadside_station_name = [];
let SandG_roadside_station_information = [];
let SandG_roadside_station_lat = [];
let SandG_roadside_station_lng = [];
//let SandG_roadside_station_phone_number = [];

let route_roadside_station_marker = [];
let route_roadside_station_information_html = [];
let route_roadside_station_infoWindow = [];
let route_roadside_station_name = [];
let route_roadside_station_information = [];
let route_roadside_station_lat = [];
let route_roadside_station_lng = [];
//let route_roadside_station_phone_number = [];

let SandG_interesting_marker = [];
let SandG_interesting_information_html = [];
let SandG_interesting_infoWindow = [];
let SandG_interesting_name = [];
let SandG_interesting_information = [];
let SandG_interesting_lat = [];
let SandG_interesting_lng = [];
//let SandG_interesting_phone_number = [];

let route_interesting_marker = [];
let route_interesting_information_html = [];
let route_interesting_infoWindow = [];
let route_interesting_name = [];
let route_interesting_information = [];
let route_interesting_lat = [];
let route_interesting_lng = [];
//let route_interesting_phone_number = [];

let SandG_convenience_marker = [];
let SandG_convenience_information_html = [];
let SandG_convenience_infoWindow = [];
let SandG_convenience_name = [];
//let SandG_interesting_information = [];
let SandG_convenience_lat = [];
let SandG_convenience_lng = [];
//let SandG_interesting_phone_number = [];

let route_convenience_marker = [];
let route_convenience_information_html = [];
let route_convenience_infoWindow = [];
let route_convenience_name = [];
//let route_interesting_information = [];
let route_convenience_lat = [];
let route_convenience_lng = [];
//let route_interesting_phone_number = [];

function initialize() {
    //geocoder = new google.maps.Geocoder();
    latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
        zoom: 16,
        center: latlng,
        styles:
        [
            {
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#ebe3cd"
                }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#523735"
                }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#f5f1e6"
                }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                {
                    "color": "#c9b2a6"
                }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "geometry.stroke",
                "stylers": [
                {
                    "color": "#dcd2be"
                }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels",
                "stylers": [
                {
                    "visibility": "off"
                }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#ae9e90"
                }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#dfd2ae"
                }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#dfd2ae"
                }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [
                {
                    "visibility": "off"
                }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#93817c"
                }
                ]
            },
            {
                "featureType": "poi.business",
                "stylers": [
                {
                    "visibility": "off"
                }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                {
                    "color": "#a5b076"
                }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text",
                "stylers": [
                {
                    "visibility": "off"
                }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#447530"
                }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#f5f1e6"
                }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#fdfcf8"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#f8c967"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                {
                    "color": "#e9bc62"
                }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#e98d58"
                }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [
                {
                    "color": "#db8555"
                }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels",
                "stylers": [
                {
                    "visibility": "off"
                }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#806b63"
                }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#dfd2ae"
                }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#8f7d77"
                }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#ebe3cd"
                }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#dfd2ae"
                }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                {
                    "color": "#b9d3c2"
                }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#92998d"
                }
                ]
            }
        ]
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    //bounds = new google.maps.LatLngBounds();
}

//------------------------------------------------------------------------------------
function initMap_WayPoints() {

    // マップの生成
    initialize();
    bounds = new google.maps.LatLngBounds();

    //物件のピンを立てる-------------------------------------------------------

    //寺周辺の物件情報------------------------
    //グルメ----------
    SandG_gourmet_name = document.getElementById( "SandG_gourmet_name" ).value;
    SandG_gourmet_name = SandG_gourmet_name.split(/[(',)]/);
    SandG_gourmet_name = SandG_gourmet_name.filter(Boolean);

    //console.log("SandG_gourmet_name:::" + SandG_gourmet_name);
    //console.log("SandG_gourmet_name.length:::" + SandG_gourmet_name.length);

    SandG_gourmet_information = document.getElementById( "SandG_gourmet_information" ).value;
    SandG_gourmet_information = SandG_gourmet_information.split(/[(',)]/);
    SandG_gourmet_information = SandG_gourmet_information.filter(Boolean);

    SandG_gourmet_lat = document.getElementById( "SandG_gourmet_lat" ).value;
    SandG_gourmet_lat = SandG_gourmet_lat.split(/[(',)]/);
    SandG_gourmet_lat = SandG_gourmet_lat.filter(Boolean);

    SandG_gourmet_lng = document.getElementById( "SandG_gourmet_lng" ).value;
    SandG_gourmet_lng = SandG_gourmet_lng.split(/[(',)]/);
    SandG_gourmet_lng = SandG_gourmet_lng.filter(Boolean);

    //console.log("SandG_gourmet_lng:::" + SandG_gourmet_lng);
    //console.log("SandG_gourmet_name.lng:::" + SandG_gourmet_lng.length);

    SandG_gourmet_phone_number = document.getElementById( "SandG_gourmet_phone_number" ).value;
    //console.log("SandG_gourmet_phone_number1:::" + SandG_gourmet_phone_number)
    SandG_gourmet_phone_number = SandG_gourmet_phone_number.split(/[(',)]/);
    SandG_gourmet_phone_number = SandG_gourmet_phone_number.filter(Boolean);

    //console.log("SandG_gourmet_phone_number:::" + SandG_gourmet_phone_number)
    //console.log("SandG_gourmet_phone_number.length:::" + SandG_gourmet_phone_number.length);

    //ピンを立てる----------
    for(let i = 0; i < SandG_gourmet_name.length; i++)
    {
        //マーカーを立てる
        SandG_gourmet_marker[i] = new google.maps.Marker({
            position: {lat:parseFloat(SandG_gourmet_lat[i]),lng:parseFloat(SandG_gourmet_lng[i])},
            map: map,
            icon:{
                url:"http://127.0.0.1:5000/static/img/gourmet_pin.png",
                scaledSize : new google.maps.Size(20, 27)
            }
        });

        //吹き出し
        SandG_gourmet_information_html[i] = "<div class='information'>"+ SandG_gourmet_name[i] + "<br>" + SandG_gourmet_information[i] + "<br>TELL:" + SandG_gourmet_phone_number[i] + "</div>";//informationをhtmlに変換
        SandG_gourmet_infoWindow[i] = new google.maps.InfoWindow({
            content: SandG_gourmet_information_html[i] // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
        });

        //マーカーをクリックしたとき吹き出しを表示
        SandG_gourmet_marker[i].addListener('click', function() {
            SandG_gourmet_infoWindow[i].open(map, SandG_gourmet_marker[i]);
        });
    }

    //宿----------
    SandG_inn_name = document.getElementById( "SandG_inn_name" ).value;
    SandG_inn_name = SandG_inn_name.split(/[(',)]/);
    SandG_inn_name = SandG_inn_name.filter(Boolean);

    SandG_inn_information = document.getElementById( "SandG_inn_information" ).value;
    SandG_inn_information = SandG_inn_information.split(/[(',)]/);
    SandG_inn_information = SandG_inn_information.filter(Boolean);

    SandG_inn_lat = document.getElementById( "SandG_inn_lat" ).value;
    SandG_inn_lat = SandG_inn_lat.split(/[(',)]/);
    SandG_inn_lat = SandG_inn_lat.filter(Boolean);

    SandG_inn_lng = document.getElementById( "SandG_inn_lng" ).value;
    SandG_inn_lng = SandG_inn_lng.split(/[(',)]/);
    SandG_inn_lng = SandG_inn_lng.filter(Boolean);

    SandG_inn_phone_number = document.getElementById( "SandG_inn_phone_number" ).value;
    SandG_inn_phone_number = SandG_inn_phone_number.split(/[(',)]/);
    SandG_inn_phone_number = SandG_inn_phone_number.filter(Boolean);

    //ピンを立てる----------
    for(let i = 0; i < SandG_inn_name.length; i++)
    {
        //マーカーを立てる
        SandG_inn_marker[i] = new google.maps.Marker({
            position: {lat:parseFloat(SandG_inn_lat[i]),lng:parseFloat(SandG_inn_lng[i])},
            map: map,
            icon: {
                url:"http://127.0.0.1:5000/static/img/inn_pin.png",
                scaledSize : new google.maps.Size(20, 27)
            }
        });

        //吹き出し
        SandG_inn_information_html[i] = "<div class='information'>"+ SandG_inn_name[i] + "<br>" + SandG_inn_information[i] + "<br>TELL:" + SandG_inn_phone_number[i] + "</div>";//informationをhtmlに変換
        SandG_inn_infoWindow[i] = new google.maps.InfoWindow({
            content: SandG_inn_information_html[i] // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
        });

        //マーカーをクリックしたとき吹き出しを表示
        SandG_inn_marker[i].addListener('click', function() {
            SandG_inn_infoWindow[i].open(map, SandG_inn_marker[i]);
        });
    }

    //道の駅----------
    SandG_roadside_station_name = document.getElementById( "SandG_roadside_station_name" ).value;
    SandG_roadside_station_name = SandG_roadside_station_name.split(/[(',)]/);
    SandG_roadside_station_name = SandG_roadside_station_name.filter(Boolean);

    SandG_roadside_station_information = document.getElementById( "SandG_roadside_station_information" ).value;
    SandG_roadside_station_information = SandG_roadside_station_information.split(/[(',)]/);
    SandG_roadside_station_information = SandG_roadside_station_information.filter(Boolean);

    SandG_roadside_station_lat = document.getElementById( "SandG_roadside_station_lat" ).value;
    SandG_roadside_station_lat = SandG_roadside_station_lat.split(/[(',)]/);
    SandG_roadside_station_lat = SandG_roadside_station_lat.filter(Boolean);

    SandG_roadside_station_lng = document.getElementById( "SandG_roadside_station_lng" ).value;
    SandG_roadside_station_lng = SandG_roadside_station_lng.split(/[(',)]/);
    SandG_roadside_station_lng = SandG_roadside_station_lng.filter(Boolean);

    // SandG_roadside_station_phone_number = document.getElementById( "SandG_roadside_station_phone_number" ).value;
    // SandG_roadside_station_phone_number = SandG_roadside_station_phone_number.split(/[(',)]/);
    // SandG_roadside_station_phone_number = SandG_roadside_station_phone_number.filter(Boolean);

    //ピンを立てる----------
    for(let i = 0; i < SandG_roadside_station_name.length; i++)
    {
        //マーカーを立てる
        SandG_roadside_station_marker[i] = new google.maps.Marker({
            position: {lat:parseFloat(SandG_roadside_station_lat[i]),lng:parseFloat(SandG_roadside_station_lng[i])},
            map: map,
            icon: {
                url:"http://127.0.0.1:5000/static/img/roadside_pin.png",
                scaledSize : new google.maps.Size(20, 27)
            }
        });

        //吹き出し
        SandG_roadside_station_information_html[i] = "<div class='information'>"+ SandG_roadside_station_name[i] + "<br>" + SandG_roadside_station_information[i] + "</div>";//informationをhtmlに変換
        SandG_roadside_station_infoWindow[i] = new google.maps.InfoWindow({
            content: SandG_roadside_station_information_html[i] // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
        });
        console.log("SandG_roadside_station_information_html[i]" + SandG_roadside_station_information_html[i])

        //マーカーをクリックしたとき吹き出しを表示
        SandG_roadside_station_marker[i].addListener('click', function() {
            SandG_roadside_station_infoWindow[i].open(map, SandG_roadside_station_marker[i]);
        });
    }

    //スポット----------
    SandG_interesting_name = document.getElementById( "SandG_interesting_name" ).value;
    SandG_interesting_name = SandG_interesting_name.split(/[(',)]/);
    SandG_interesting_name = SandG_interesting_name.filter(Boolean);

    SandG_interesting_information = document.getElementById( "SandG_interesting_information" ).value;
    SandG_interesting_information = SandG_interesting_information.split(/[(',)]/);
    SandG_interesting_information = SandG_interesting_information.filter(Boolean);

    SandG_interesting_lat = document.getElementById( "SandG_interesting_lat" ).value;
    SandG_interesting_lat = SandG_interesting_lat.split(/[(',)]/);
    SandG_interesting_lat = SandG_interesting_lat.filter(Boolean);

    SandG_interesting_lng = document.getElementById( "SandG_interesting_lng" ).value;
    SandG_interesting_lng = SandG_interesting_lng.split(/[(',)]/);
    SandG_interesting_lng = SandG_interesting_lng.filter(Boolean);

    // SandG_interesting_phone_number = document.getElementById( "SandG_roadside_station_phone_number" ).value;
    // SandG_interesting_phone_number = SandG_roadside_station_phone_number.split(/[(',)]/);
    // SandG_interesting_phone_number = SandG_roadside_station_phone_number.filter(Boolean);

    //ピンを立てる----------
    for(let i = 0; i < SandG_interesting_name.length; i++)
    {
        //マーカーを立てる
        SandG_interesting_marker[i] = new google.maps.Marker({
            position: {lat:parseFloat(SandG_interesting_lat[i]),lng:parseFloat(SandG_interesting_lng[i])},
            map: map,
            icon: {
                url:"http://127.0.0.1:5000/static/img/interesting_pin.png",
                scaledSize : new google.maps.Size(20, 27)
            }

        });

        //吹き出し
        SandG_interesting_information_html[i] = "<div class='information'>"+ SandG_interesting_name[i] + "<br>" + SandG_interesting_information[i] + "</div>";//informationをhtmlに変換
        SandG_interesting_infoWindow[i] = new google.maps.InfoWindow({
            content: SandG_interesting_information_html[i] // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
        });
        //console.log("SandG_interesting_information_html[i]" + SandG_roadside_station_information_html[i])

        //マーカーをクリックしたとき吹き出しを表示
        SandG_interesting_marker[i].addListener('click', function() {
            SandG_interesting_infoWindow[i].open(map, SandG_interesting_marker[i]);
        });
    }

    //コンビニ----------
    SandG_convenience_name = document.getElementById( "SandG_convenience_name" ).value;
    SandG_convenience_name = SandG_convenience_name.split(/[(',)]/);
    SandG_convenience_name = SandG_convenience_name.filter(Boolean);

    // SandG_convenience_information = document.getElementById( "SandG_convenience_information" ).value;
    // SandG_convenience_information = SandG_interesting_information.split(/[(',)]/);
    // SandG_convenience_information = SandG_interesting_information.filter(Boolean);

    SandG_convenience_lat = document.getElementById( "SandG_convenience_lat" ).value;
    SandG_convenience_lat = SandG_convenience_lat.split(/[(',)]/);
    SandG_convenience_lat = SandG_convenience_lat.filter(Boolean);

    SandG_convenience_lng = document.getElementById( "SandG_convenience_lng" ).value;
    SandG_convenience_lng = SandG_convenience_lng.split(/[(',)]/);
    SandG_convenience_lng = SandG_convenience_lng.filter(Boolean);

    // SandG_interesting_phone_number = document.getElementById( "SandG_roadside_station_phone_number" ).value;
    // SandG_interesting_phone_number = SandG_roadside_station_phone_number.split(/[(',)]/);
    // SandG_interesting_phone_number = SandG_roadside_station_phone_number.filter(Boolean);

    //ピンを立てる----------
    for(let i = 0; i < SandG_convenience_name.length; i++)
    {
        //マーカーを立てる
        SandG_convenience_marker[i] = new google.maps.Marker({
            position: {lat:parseFloat(SandG_convenience_lat[i]),lng:parseFloat(SandG_convenience_lng[i])},
            map: map,
            icon:{
                url:"http://127.0.0.1:5000/static/img/convenience_pin.png",
                scaledSize : new google.maps.Size(20, 27)
            }
        });

        //吹き出し
        SandG_convenience_information_html[i] = "<div class='information'>"+ SandG_convenience_name[i] + "</div>";//informationをhtmlに変換
        SandG_convenience_infoWindow[i] = new google.maps.InfoWindow({
            content: SandG_convenience_information_html[i] // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
        });
        //console.log("SandG_interesting_information_html[i]" + SandG_roadside_station_information_html[i])

        //マーカーをクリックしたとき吹き出しを表示
        SandG_convenience_marker[i].addListener('click', function() {
            SandG_convenience_infoWindow[i].open(map, SandG_convenience_marker[i]);
        });
    }

    //-----------------------------------------------------------
    //ルート中の物件情報---------------------------

    //グルメ
    route_gourmet_name = document.getElementById( "route_gourmet_name" ).value;
    route_gourmet_name = route_gourmet_name.split(/[(',)]/);
    route_gourmet_name = route_gourmet_name.filter(Boolean);

    route_gourmet_information = document.getElementById( "route_gourmet_information" ).value;
    route_gourmet_information = route_gourmet_information.split(/[(',)]/);
    route_gourmet_information = route_gourmet_information.filter(Boolean);

    route_gourmet_lat = document.getElementById( "route_gourmet_lat" ).value;
    route_gourmet_lat = route_gourmet_lat.split(/[(',)]/);
    route_gourmet_lat = route_gourmet_lat.filter(Boolean);

    route_gourmet_lng = document.getElementById( "route_gourmet_lng" ).value;
    route_gourmet_lng = route_gourmet_lng.split(/[(',)]/);
    route_gourmet_lng = route_gourmet_lng.filter(Boolean);

    route_gourmet_phone_number = document.getElementById( "route_gourmet_phone_number" ).value;
    route_gourmet_phone_number = route_gourmet_phone_number.split(/[(',)]/);
    route_gourmet_phone_number = route_gourmet_phone_number.filter(Boolean);

    //ピンを立てる----------
    for(let i = 0; i < route_gourmet_name.length; i++)
    {
        //マーカーを立てる
        route_gourmet_marker[i] = new google.maps.Marker({
            position: {lat:parseFloat(route_gourmet_lat[i]),lng:parseFloat(route_gourmet_lng[i])},
            map: map,
            icon:{
                url:"http://127.0.0.1:5000/static/img/gourmet_pin.png",
                scaledSize : new google.maps.Size(20, 27)
            }
        });

        //吹き出し
        route_gourmet_information_html[i] = "<div class='information'>"+ route_gourmet_name[i] + "<br>" + route_gourmet_information[i] + "<br>TELL:" + route_gourmet_phone_number[i] + "</div>";//informationをhtmlに変換
        route_gourmet_infoWindow[i] = new google.maps.InfoWindow({
            content: route_gourmet_information_html[i] // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
        });

        //マーカーをクリックしたとき吹き出しを表示
        route_gourmet_marker[i].addListener('click', function() {
            route_gourmet_infoWindow[i].open(map, route_gourmet_marker[i]);
        });
    }

    //宿
    route_inn_name = document.getElementById( "route_inn_name" ).value;
    route_inn_name = route_inn_name.split(/[(',)]/);
    route_inn_name = route_inn_name.filter(Boolean);

    route_inn_information = document.getElementById( "route_inn_information" ).value;
    route_inn_information = route_inn_information.split(/[(',)]/);
    route_inn_information = route_inn_information.filter(Boolean);

    route_inn_lat = document.getElementById( "route_inn_lat" ).value;
    route_inn_lat = route_inn_lat.split(/[(',)]/);
    route_inn_lat = route_inn_lat.filter(Boolean);

    route_inn_lng = document.getElementById( "route_inn_lng" ).value;
    route_inn_lng = route_inn_lng.split(/[(',)]/);
    route_inn_lng = route_inn_lng.filter(Boolean);

    route_inn_phone_number = document.getElementById( "route_inn_phone_number" ).value;
    route_inn_phone_number = route_inn_phone_number.split(/[(',)]/);
    route_inn_phone_number = route_inn_phone_number.filter(Boolean);

    //ピンを立てる----------
    for(let i = 0; i < route_inn_name.length; i++)
    {
        //マーカーを立てる
        route_inn_marker[i] = new google.maps.Marker({
            position: {lat:parseFloat(route_inn_lat[i]),lng:parseFloat(route_inn_lng[i])},
            map: map,
            icon:{
                url:"http://127.0.0.1:5000/static/img/inn_pin.png",
                scaledSize : new google.maps.Size(20, 27)
            }
        });

        //吹き出し
        route_inn_information_html[i] = "<div class='information'>"+ route_inn_name[i] + "<br>" + route_inn_information[i] + "<br>TELL:" + route_inn_phone_number[i] + "</div>";//informationをhtmlに変換
        route_inn_infoWindow[i] = new google.maps.InfoWindow({
            content: route_inn_information_html[i] // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
        });

        //マーカーをクリックしたとき吹き出しを表示
        route_inn_marker[i].addListener('click', function() {
            route_inn_infoWindow[i].open(map, route_inn_marker[i]);
        });
    }

    //道の駅
    route_roadside_station_name = document.getElementById( "route_roadside_station_name" ).value;
    route_roadside_station_name = route_roadside_station_name.split(/[(',)]/);
    route_roadside_station_name = route_roadside_station_name.filter(Boolean);
    //console.log("route_roadside_station_name :::" + route_roadside_station_name )

    route_roadside_station_information = document.getElementById( "route_roadside_station_information" ).value;
    route_roadside_station_information = route_roadside_station_information.split(/[(',)]/);
    route_roadside_station_information = route_roadside_station_information.filter(Boolean);

    route_roadside_station_lat = document.getElementById( "route_roadside_station_lat" ).value;
    route_roadside_station_lat = route_roadside_station_lat.split(/[(',)]/);
    route_roadside_station_lat = route_roadside_station_lat.filter(Boolean);
    //console.log("route_roadside_station_lat :::" + route_roadside_station_lat )

    route_roadside_station_lng = document.getElementById( "route_roadside_station_lng" ).value;
    route_roadside_station_lng = route_roadside_station_lng.split(/[(',)]/);
    route_roadside_station_lng = route_roadside_station_lng.filter(Boolean);

    // route_roadside_station_phone_number = document.getElementById( "route_roadside_station_phone_number" ).value;
    // route_roadside_station_phone_number = route_roadside_station_phone_number.split(/[(',)]/);
    // route_roadside_station_phone_number = route_roadside_station_phone_number.filter(Boolean);

    //ピンを立てる----------
    for(let i = 0; i < route_roadside_station_name.length; i++)
    {
        //マーカーを立てる
        route_roadside_station_marker[i] = new google.maps.Marker({
            position: {lat:parseFloat(route_roadside_station_lat[i]),lng:parseFloat(route_roadside_station_lng[i])},
            map: map,
            icon:{
                url:"http://127.0.0.1:5000/static/img/roadside_pin.png",
                scaledSize : new google.maps.Size(20, 27)
            }
        });

        //吹き出し
        route_roadside_station_information_html[i] = "<div class='information'>"+ route_roadside_station_name[i] + "<br>" + route_roadside_station_information[i] + "</div>";//informationをhtmlに変換
        route_roadside_station_infoWindow[i] = new google.maps.InfoWindow({
            content: route_roadside_station_information_html[i] // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
        });
        //console.log("route_roadside_station_information_html[i]::" + route_roadside_station_information_html[i])

        //マーカーをクリックしたとき吹き出しを表示
        route_roadside_station_marker[i].addListener('click', function() {
            route_roadside_station_infoWindow[i].open(map, route_roadside_station_marker[i]);
        });
    }


    //スポット
    route_interesting_name = document.getElementById( "route_interesting_name" ).value;
    route_interesting_name = route_interesting_name.split(/[(',)]/);
    route_interesting_name = route_interesting_name.filter(Boolean);
    //console.log("route_roadside_station_name :::" + route_roadside_station_name )

    route_interesting_information = document.getElementById( "route_interesting_information" ).value;
    route_interesting_information = route_interesting_information.split(/[(',)]/);
    route_interesting_information = route_interesting_information.filter(Boolean);

    route_interesting_lat = document.getElementById( "route_interesting_lat" ).value;
    route_interesting_lat = route_interesting_lat.split(/[(',)]/);
    route_interesting_lat = route_interesting_lat.filter(Boolean);
    //console.log("route_roadside_station_lat :::" + route_roadside_station_lat )

    route_interesting_lng = document.getElementById( "route_interesting_lng" ).value;
    route_interesting_lng = route_interesting_lng.split(/[(',)]/);
    route_interesting_lng = route_interesting_lng.filter(Boolean);

    //ピンを立てる----------
    for(let i = 0; i < route_interesting_name.length; i++)
    {
        //マーカーを立てる
        route_interesting_marker[i] = new google.maps.Marker({
            position: {lat:parseFloat(route_interesting_lat[i]),lng:parseFloat(route_interesting_lng[i])},
            map: map,
            icon:{
                url:"http://127.0.0.1:5000/static/img/interesting_pin.png",
                scaledSize : new google.maps.Size(20, 27)
            }
        });

        //吹き出し
        route_interesting_information_html[i] = "<div class='information'>"+ route_interesting_name[i] + "<br>" + route_interesting_information[i] + "</div>";//informationをhtmlに変換
        route_interesting_infoWindow[i] = new google.maps.InfoWindow({
            content: route_interesting_information_html[i] // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
        });
        //console.log("route_roadside_station_information_html[i]::" + route_roadside_station_information_html[i])

        //マーカーをクリックしたとき吹き出しを表示
        route_interesting_marker[i].addListener('click', function() {
            route_interesting_infoWindow[i].open(map, route_interesting_marker[i]);
        });
    }

    //コンビニ
    route_convenience_name = document.getElementById( "route_convenience_name" ).value;
    route_convenience_name = route_convenience_name.split(/[(',)]/);
    route_convenience_name = route_convenience_name.filter(Boolean);
    //console.log("route_roadside_station_name :::" + route_roadside_station_name )

    // route_convenience_information = document.getElementById( "route_convenience_information" ).value;
    // route_convenience_information = route_convenience_information.split(/[(',)]/);
    // route_convenience_information = route_convenience_information.filter(Boolean);

    route_convenience_lat = document.getElementById( "route_convenience_lat" ).value;
    route_convenience_lat = route_convenience_lat.split(/[(',)]/);
    route_convenience_lat = route_convenience_lat.filter(Boolean);
    //console.log("route_roadside_station_lat :::" + route_roadside_station_lat )

    route_convenience_lng = document.getElementById( "route_convenience_lng" ).value;
    route_convenience_lng = route_convenience_lng.split(/[(',)]/);
    route_convenience_lng = route_convenience_lng.filter(Boolean);

    //ピンを立てる----------
    for(let i = 0; i < route_convenience_name.length; i++)
    {
        //マーカーを立てる
        route_convenience_marker[i] = new google.maps.Marker({
            position: {lat:parseFloat(route_convenience_lat[i]),lng:parseFloat(route_convenience_lng[i])},
            map: map,
            icon:{
                url:"http://127.0.0.1:5000/static/img/convenience_pin.png",
                scaledSize : new google.maps.Size(20, 27)
            }
        });

        //吹き出し
        route_convenience_information_html[i] = "<div class='information'>"+ route_convenience_name[i] + "</div>";//informationをhtmlに変換
        route_convenience_infoWindow[i] = new google.maps.InfoWindow({
            content: route_convenience_information_html[i] // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
        });
        //console.log("route_roadside_station_information_html[i]::" + route_roadside_station_information_html[i])

        //マーカーをクリックしたとき吹き出しを表示
        route_convenience_marker[i].addListener('click', function() {
            route_convenience_infoWindow[i].open(map, route_convenience_marker[i]);
        });
    }

    //経由地の情報---------------------------------------------------------------------
    //寺番号
    waypoints_temple_number = document.getElementById( "waypoints_temple_number" ).value;
    waypoints_temple_number = waypoints_temple_number.split(/[(',)]/);
    waypoints_temple_number = waypoints_temple_number.filter(Boolean);

    //名前
    waypoints_temple_name = document.getElementById( "waypoints_temple_name" ).value;
    waypoints_temple_name = waypoints_temple_name.split(/[(',)]/);
    waypoints_temple_name = waypoints_temple_name.filter(Boolean);

    //情報
    waypoints_temple_information = document.getElementById( "waypoints_temple_information" ).value;
    waypoints_temple_information = waypoints_temple_information.split(/[(',)]/);
    waypoints_temple_information = waypoints_temple_information.filter(Boolean);
    
    //経由地の緯度
    waypoints_temple_lat = document.getElementById( "waypoints_temple_lat" ).value;
    waypoints_temple_lat = waypoints_temple_lat.split(/[(',)]/);
    waypoints_temple_lat = waypoints_temple_lat.filter(Boolean);

    //経由地の経度
    waypoints_temple_lng = document.getElementById( "waypoints_temple_lng" ).value;
    waypoints_temple_lng = waypoints_temple_lng.split(/[(',)]/);
    waypoints_temple_lng = waypoints_temple_lng.filter(Boolean);
    //console.log("経度：" + waypoints_temple_lng[0]);

    var strmaekakko = "[";
    var strusirokakko = "]";
    var strspace = " ";
    //var test = "aaaaa".normalize();
    //console.log(test);

    //途中の寺の座標をリスト化
    for(var i = 0; i <= waypoints_temple_lat.length; i++)
    {
        //余計な記号は削除
        //console.log("in:" + i);
        if(String(waypoints_temple_lat[i]) != strmaekakko &&
            String(waypoints_temple_lat[i]) != strusirokakko &&
            String(waypoints_temple_lat[i]) != strspace &&
            waypoints_temple_lat[i] != null)
        {
            //console.log(String(waypoints_temple_lat) == '[');
            //console.log("ok" + i);
            waypoints_points.push(new google.maps.LatLng(waypoints_temple_lat[i],waypoints_temple_lng[i]));
        }
    }
    //console.log("all:" + waypoints_points);
    //console.log("0:" + waypoints_points[0]);

    //経由地のピンを立てる----------
    for(let i = 0; i < waypoints_temple_name.length; i++)
    {
        //マーカーの画像
        var image;
        if(waypoints_temple_number[i] < 10)
        {
            image = "http://127.0.0.1:5000/static/img/temples_pin/temple_pin0" + waypoints_temple_number[i] + ".png" 
            //console.log("temple_number < 10");
        }
        else{
            image = "http://127.0.0.1:5000/static/img/temples_pin/temple_pin" + waypoints_temple_number[i] + ".png" 
            //console.log("temple_number >= 10");
        }
        //マーカーを立てる
        //temple_latlng = {lat:parseFloat(temple_lat[i]),lng:parseFloat(temple_lng[i])};
        waypoints_temple_marker[i] = new google.maps.Marker({
            position: {lat:parseFloat(waypoints_temple_lat[i]),lng:parseFloat(waypoints_temple_lng[i])},
            map: map,
            icon:{
                url:image,
                scaledSize : new google.maps.Size(50, 32)
            }
        });

        //経由地の寺が表示されるようにzoom
        zoomlat = parseFloat(waypoints_temple_lat[i]);
        zoomlng = parseFloat(waypoints_temple_lng[i]);
        if(isNaN(zoomlat) == false && isNaN(zoomlng) == false){
            latLngzoom = new google.maps.LatLng(zoomlat,zoomlng)
            bounds.extend(latLngzoom);
        }

        //吹き出し
        waypoints_temple_information_html[i] = "<div class='information'>"+ waypoints_temple_number[i] + "番札所:" + waypoints_temple_name[i] + "<br>" + waypoints_temple_information[i] + "</div>";//informationをhtmlに変換
        waypoints_temple_infoWindow[i] = new google.maps.InfoWindow({
            content: waypoints_temple_information_html[i] // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
        });

        //マーカーをクリックしたとき吹き出しを表示
        waypoints_temple_marker[i].addListener('click', function() {
            waypoints_temple_infoWindow[i].open(map, waypoints_temple_marker[i]);
        });
    }
    map.fitBounds(bounds);//zoomの設定


    //スタートとゴールの寺のピンを立てる------------------------------------------------------------------------------------------------------------------------------------------------
    let Start_temple_number = document.getElementById( "Start_temple_number" ).value;//スタートの札番
    let Goal_temple_number = document.getElementById( "Goal_temple_number" ).value;//ゴールの札番

    //スタートとゴールの各種情報
    //寺番号
    temple_number = document.getElementById( "temple_number" ).value;
    temple_number = temple_number.split(/[(',)]/);
    temple_number = temple_number.filter(Boolean);

    //名前
    temple_name = document.getElementById( "temple_name" ).value;
    temple_name = temple_name.split(/[(',)]/);
    temple_name = temple_name.filter(Boolean);

    //情報
    temple_information = document.getElementById( "temple_information" ).value;
    temple_information = temple_information.split(/[(',)]/);
    temple_information = temple_information.filter(Boolean);

    //緯度
    temple_lat = document.getElementById( "temple_lat" ).value;
    temple_lat = temple_lat.split(/[(',)]/);
    temple_lat = temple_lat.filter(Boolean);

    //経度
    temple_lng = document.getElementById( "temple_lng" ).value;
    temple_lng = temple_lng.split(/[(',)]/);
    temple_lng = temple_lng.filter(Boolean);

    //bounds = new google.maps.LatLngBounds();

    for (let i = 0; i < temple_name.length; i++) {//ピンを多数立てるためにリストの数だけ回す

        var image;
        if(temple_number[i] < 10)
        {
            image = "http://127.0.0.1:5000/static/img/temples_pin/temple_pin0" + temple_number[i] + ".png" 
            //console.log("temple_number < 10");
        }
        else{
            image = "http://127.0.0.1:5000/static/img/temples_pin/temple_pin" + temple_number[i] + ".png" 
            //console.log("temple_number >= 10");
        }
        //マーカーを立てる
        //temple_latlng = {lat:parseFloat(temple_lat[i]),lng:parseFloat(temple_lng[i])};
        temple_marker[i] = new google.maps.Marker({
            position: {lat:parseFloat(temple_lat[i]),lng:parseFloat(temple_lng[i])},
            map: map,
            icon:{
                url:image,
                scaledSize : new google.maps.Size(50, 32)
            }
        });

        //スタートとゴールの寺が表示されるようにzoom
        zoomlat = parseFloat(temple_lat[i]);
        zoomlng = parseFloat(temple_lng[i]);
        if(isNaN(zoomlat) == false && isNaN(zoomlng) == false){
            latLngzoom = new google.maps.LatLng(zoomlat,zoomlng)
            bounds.extend(latLngzoom);
        }

        //吹き出し
        temple_information_html[i] = "<div class='information'>"+ temple_number[i] + "番札所:" + temple_name[i] + "<br>" + temple_information[i] + "</div>";//informationをhtmlに変換
        temple_infoWindow[i] = new google.maps.InfoWindow({
            content: temple_information_html[i] // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
        });

        //マーカーをクリックしたとき吹き出しを表示
        temple_marker[i].addListener('click', function() {
            temple_infoWindow[i].open(map, temple_marker[i]);
        });

        //スタートとゴールを保存。ルート表示に使う
        if(temple_number[i] == Start_temple_number)
        {
            startlat = parseFloat(temple_lat[i]);
            startlng = parseFloat(temple_lng[i]);
        }

        if(temple_number[i] == Goal_temple_number)
        {
            goallat = parseFloat(temple_lat[i]);
            goallng = parseFloat(temple_lng[i]);
        }

    }
    map.fitBounds(bounds);//zoomの設定

// 地点を分割してルート検索を行います-------------------------------------------------------------------------------
//経由地の座標 waypoints_points
//スタート、ゴールの座標 startlat startlng goallat goallng


    var d = new google.maps.DirectionsService(); // ルート検索オブジェクト
    var origin = null, waypoints = [], dest = null; // 出発地、経由地、目的地
    var resultMap = {}; // 分割してルート検索した結果データ
    var requestIndex = 0; // 検索番号
    var done = 0; // ルート検索が完了した数

    for (var i = 0, len = waypoints_points.length + 1; i < len; i++) {
        // 最初の場合、originに値をセット
        if (origin == null) {
            origin = new google.maps.LatLng(startlat,startlng);
            //console.log("i:" + i);
            //console.log("waypoints_points[i]:" + waypoints_points[i]);
            waypoints.push({ location: waypoints_points[i], stopover: true });//最初の経由地も入れる
        }
        // 経由地が8つたまったか最後の地点の場合、ルート検索
        else if (waypoints.length == 8 || i == len - 1) {

            //最後の場合ゴールを入れる
            if(i == len - 1)
            {
                dest = new google.maps.LatLng(goallat,goallng);
            }
            else
            {
                dest = waypoints_points[i];
            }

            (function(index){
                // ルート検索の条件
                var request = {
                    origin: origin, // 出発地
                    destination: dest, // 目的地
                    waypoints: waypoints, // 経由地
                    travelMode: google.maps.DirectionsTravelMode.WALKING, // 交通手段(歩行。DRIVINGの場合は車)
                };
                //console.log(request);

                // ルート検索
                d.route(request, function(result, status){
                    // OKの場合ルートデータ保持
                    if (status == google.maps.DirectionsStatus.OK) {
                        resultMap[index] = result; // 並行でリクエストするので配列だとリクエスト順とずれる場合があります
                        done++;
                    }
                    else {
                        console.log(status); // デバッグ
                    }
                });
            })(requestIndex);

            requestIndex++;
            origin = waypoints_points[i]; // 今回の目的地を次回の出発地にします。
            waypoints = [];
        }
        // 上記以外、waypointsに地点を追加
        else {
            //console.log("i:" + i);
            //console.log("waypoints_points[i]:" + waypoints_points[i]);
            waypoints.push({ location: waypoints_points[i], stopover: true });
        }

        //console.log("waypoints_points[i].lat():" + waypoints_points[i].lat())
        //全ての寺が表示されるようにzoom
        // zoomlat = waypoints_points[i].lat();
        // console.log("waypoints_points[i].lat():" + waypoints_points[i].lat());
        // zoomlng = waypoints_points[i].lng();
        // if(isNaN(zoomlat) == false && isNaN(zoomlng) == false){
        //     latLngzoom = new google.maps.LatLng(zoomlat,zoomlng)
        //     bounds.extend(latLngzoom);
        // }
    }
    //map.fitBounds(bounds);//zoomの設定

    // // マーカーを表示する場合の準備
    // var infoWindow = new google.maps.InfoWindow();
    // var mark = function(position, content) {
    //     var marker = new google.maps.Marker({
    //         map: map, // 描画先の地図
    //         position: position // 座標
    //     });
    //     // クリック時吹き出しを表示
    //     marker.addListener("click", function(){
    //         infoWindow.setContent(content);
    //         infoWindow.open(map, marker);
    //     });
    // };

    var sid = setInterval(function(){
        // 分割したすべての検索が完了するまで待ちます。
        if (requestIndex > done) return;
        clearInterval(sid);

        // すべての結果のルート座標を順番に取得して平坦な配列にします。
        var path = [];
        var result;
        for (var i = 0, len = requestIndex; i < len; i++) {
            result = resultMap[i]; // 検索結果
            var legs = result.routes[0].legs; // Array<DirectionsLeg>
            for (var li = 0, llen = legs.length; li < llen; li++) {
                var leg = legs[li]; // DirectionLeg
                var steps = leg.steps; // Array<DirectionsStep>
                // DirectionsStepが持っているpathを取得して平坦(2次元配列→1次元配列)にします。
                var _path = steps.map(function(step){ return step.path })
                    .reduce(function(all, paths){ return all.concat(paths) });
                path = path.concat(_path);

                // マーカーが必要ならマーカーを表示します。
                //mark(leg.start_location, leg.start_address);
            }
        }
        // マーカーが必要ならマーカーを表示します。(最終)
        // var endLeg = result.routes[0].legs[result.routes[0].legs.length-1];
        // mark(endLeg.end_location, endLeg.end_address);



        // パスを描画します。
        var line = new google.maps.Polyline({
            map: map, // 描画先の地図
            strokeColor: "#2196f3", // 線の色
            strokeOpacity: 0.8, // 線の不透明度
            strokeWeight: 6, // 先の太さ
            path: path // 描画するパスデータ
        });
    }, 500);
//-----------------------------------------------------------------------------------
}

// function initMap() {

//     initialize();
//     bounds = new google.maps.LatLngBounds();

//     //寺のピンを立てる------------------------------------------------------------------------------------------------------------------------------------------------
//     let Start_temple_number = document.getElementById( "Start_temple_number" ).value;//スタートの札番
//     let Goal_temple_number = document.getElementById( "Goal_temple_number" ).value;//ゴールの札番

//     //スタートとゴールの各種情報
//     //寺番号
//     temple_number = document.getElementById( "temple_number" ).value;
//     temple_number = temple_number.split(/[(',)]/);
//     temple_number = temple_number.filter(Boolean);

//     //名前
//     temple_name = document.getElementById( "temple_name" ).value;
//     temple_name = temple_name.split(/[(',)]/);
//     temple_name = temple_name.filter(Boolean);

//     //情報
//     temple_information = document.getElementById( "temple_information" ).value;
//     temple_information = temple_information.split(/[(',)]/);
//     temple_information = temple_information.filter(Boolean);

//     //緯度
//     temple_lat = document.getElementById( "temple_lat" ).value;
//     temple_lat = temple_lat.split(/[(',)]/);
//     temple_lat = temple_lat.filter(Boolean);

//     //経度
//     temple_lng = document.getElementById( "temple_lng" ).value;
//     temple_lng = temple_lng.split(/[(',)]/);
//     temple_lng = temple_lng.filter(Boolean);

//     bounds = new google.maps.LatLngBounds();

//     for (let i = 0; i < temple_name.length; i++) {//ピンを多数立てるためにリストの数だけ回す

//         //マーカーを立てる
//         //temple_latlng = {lat:parseFloat(temple_lat[i]),lng:parseFloat(temple_lng[i])};
//         temple_marker[i] = new google.maps.Marker({
//             position: {lat:parseFloat(temple_lat[i]),lng:parseFloat(temple_lng[i])},
//             map: map
//         });

//         //全ての寺が表示されるようにzoom
//         zoomlat = parseFloat(temple_lat[i]);
//         zoomlng = parseFloat(temple_lng[i]);
//         if(isNaN(zoomlat) == false && isNaN(zoomlng) == false){
//             latLngzoom = new google.maps.LatLng(zoomlat,zoomlng)
//             bounds.extend(latLngzoom);
//         }

//         //console.log(parseFloat(temple_lat[i]));
//         //bounds.extend(latLngtest);
//         //console.log(bounds);

//         //地図の中心に設定
//         // if(temple_number[i] == Start_temple_number)
//         // {
//         //     map.setCenter({lat:parseFloat(temple_lat[i]),lng:parseFloat(temple_lng[i])});
//         // }

//         //吹き出し
//         temple_information_html[i] = "<div class='information'>"+ temple_number[i] + "番札所:" + temple_name[i] + "<br>" + temple_information[i] + "</div>";//informationをhtmlに変換
//         temple_infoWindow[i] = new google.maps.InfoWindow({
//             content: temple_information_html[i] // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
//         });

//         //マーカーをクリックしたとき吹き出しを表示
//         temple_marker[i].addListener('click', function() {
//             temple_infoWindow[i].open(map, temple_marker[i]);
//         });

//         //スタートとゴールを保存。ルート表示に使う
//         if(temple_number[i] == Start_temple_number)
//         {
//             startlat = parseFloat(temple_lat[i]);
//             startlng = parseFloat(temple_lng[i]);
//         }

//         if(temple_number[i] == Goal_temple_number)
//         {
//             goallat = parseFloat(temple_lat[i]);
//             goallng = parseFloat(temple_lng[i]);
//         }

//     }
//     //console.log(bounds);
//     //map.fitBounds(bounds);//zoomの設定


//     //ルートの表示----------------------------------------------------------------
//     let rendererOptions = {
//         map: map, // 描画先の地図
//         draggable: true, // ドラッグ可
//         preserveViewport: true // centerの座標、ズームレベルで表示
//     };
    
//     let directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
//     let directionsService = new google.maps.DirectionsService();
//     directionsDisplay.setMap(map);
    
//     let request = {
//         origin: new google.maps.LatLng(startlat, startlng), // スタート地点
//         destination: new google.maps.LatLng(goallat, goallng), // ゴール地点
//         travelMode: google.maps.DirectionsTravelMode.WALKING, // 移動手段

//         // waypoints: [ // 経由地点(指定なしでも可)
//         //     { location: new google.maps.LatLng(35.630152,139.74044) },
//         //     { location: new google.maps.LatLng(35.507456,139.617585) },
//         //     { location: new google.maps.LatLng(35.25642,139.154904) },
//         //     { location: new google.maps.LatLng(35.103217,139.07776) },
//         //     { location: new google.maps.LatLng(35.127152,138.910627) },
//         //     { location: new google.maps.LatLng(35.142365,138.663199) },
//         //     { location: new google.maps.LatLng(34.97171,138.38884) },
//         //     { location: new google.maps.LatLng(34.769758,138.014928) },
//         // ],
//         //travelMode: G_TRAVEL_MODE_DRIVING
//     };

//     directionsService.route(request, function(response,status){
//         if (status === google.maps.DirectionsStatus.OK) {
//             new google.maps.DirectionsRenderer({
//                 map: map,
//                 directions: response,
//                 suppressMarkers: true // デフォルトのマーカーを削除
//             });
    
//             //let leg = response.routes[0].legs[0];
//             //makeMarker(leg.end_location, markers.goalMarker, map);
    
//             // setTimeout(function(){
//             //     map.setZoom(16); // ルート表示後にズーム率を変更
//             // });
//         }
//     });
// }



