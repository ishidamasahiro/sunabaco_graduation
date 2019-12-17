let latlng;
let map;
let bounds;

let temple_marker = [];
let temple_name = [];
let temple_number = [];
let temple_information = [];
let temple_lat = [];
let temple_lng = [];
let temple_latlng = [];
let temple_information_html = [];
let temple_infoWindow = [];


function initialize() {
    //geocoder = new google.maps.Geocoder();
    latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
        zoom: 16,
        center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    //bounds = new google.maps.LatLngBounds();
}

function initMap() {

    initialize();

    //寺のピンを立てる------------------------------------------------------------------------------------------------------------------------------------------------
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

    bounds = new google.maps.LatLngBounds();

    for (let i = 0; i < temple_name.length; i++) {//ピンを多数立てるためにリストの数だけ回す

        //マーカーを立てる
        //temple_latlng = {lat:parseFloat(temple_lat[i]),lng:parseFloat(temple_lng[i])};
        temple_marker[i] = new google.maps.Marker({
            position: {lat:parseFloat(temple_lat[i]),lng:parseFloat(temple_lng[i])},
            map: map
        });

        var test1 = parseFloat(temple_lat[i]);
        var test2 = parseFloat(temple_lng[i]);
        if(isNaN(test1) == false && isNaN(test2) == false){
            var latLngtest = new google.maps.LatLng(test1,test2)
            bounds.extend(latLngtest);
            console.log(bounds);
            console.log("OK");
            console.log(test1);
            console.log(test2);
        }

        //console.log(parseFloat(temple_lat[i]));
        //bounds.extend(latLngtest);
        //console.log(bounds);

        //地図の中心に設定
        // if(temple_number[i] == Start_temple_number)
        // {
        //     map.setCenter({lat:parseFloat(temple_lat[i]),lng:parseFloat(temple_lng[i])});
        // }

        //吹き出し
        temple_information_html[i] = "<div class='information'>"+ temple_number[i] + "番札所:" + temple_name[i] + "<br>" + temple_information[i] + "</div>";//informationをhtmlに変換
        temple_infoWindow[i] = new google.maps.InfoWindow({
            content: temple_information_html[i] // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
        });

        //マーカーをクリックしたとき吹き出しを表示
        temple_marker[i].addListener('click', function() {
            temple_infoWindow[i].open(map, temple_marker[i]);
        });
    }
    //console.log(bounds);
    map.fitBounds(bounds);
}


// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: ave_latitude, lng: ave_longitude} ,
//     zoom: 16,
//     });

//     var bounds = new google.maps.LatLngBounds();

//     for (var i = 0; i < data.length; i++) {
//         markerLatLng = {lat: data[i]['lat'], lng: data[i]['lng']};
//         marker[i] = new google.maps.Marker({
//         position: markerLatLng,
//         map: map
//     });
//     bounds.extend(new google.maps.LatLng(data[i]['lat'], data[i]['lng'])); 
//     }
//     map.fitBounds (bounds);
// }