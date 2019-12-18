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

        //全ての寺が表示されるようにzoom
        zoomlat = parseFloat(temple_lat[i]);
        zoomlng = parseFloat(temple_lng[i]);
        if(isNaN(zoomlat) == false && isNaN(zoomlng) == false){
            latLngzoom = new google.maps.LatLng(zoomlat,zoomlng)
            bounds.extend(latLngzoom);
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
    //console.log(bounds);
    map.fitBounds(bounds);//zoomの設定


    //ルートの表示----------------------------------------------------------------
    let rendererOptions = {
        map: map, // 描画先の地図
        draggable: true, // ドラッグ可
        preserveViewport: true // centerの座標、ズームレベルで表示
    };
    
    let directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    let directionsService = new google.maps.DirectionsService();
    directionsDisplay.setMap(map);
    
    let request = {
        origin: new google.maps.LatLng(startlat, startlng), // スタート地点
        destination: new google.maps.LatLng(goallat, goallng), // ゴール地点
        travelMode: google.maps.DirectionsTravelMode.WALKING, // 移動手段

        // waypoints: [ // 経由地点(指定なしでも可)
        //     { location: new google.maps.LatLng(35.630152,139.74044) },
        //     { location: new google.maps.LatLng(35.507456,139.617585) },
        //     { location: new google.maps.LatLng(35.25642,139.154904) },
        //     { location: new google.maps.LatLng(35.103217,139.07776) },
        //     { location: new google.maps.LatLng(35.127152,138.910627) },
        //     { location: new google.maps.LatLng(35.142365,138.663199) },
        //     { location: new google.maps.LatLng(34.97171,138.38884) },
        //     { location: new google.maps.LatLng(34.769758,138.014928) },
        // ],
        //travelMode: G_TRAVEL_MODE_DRIVING
    };

    directionsService.route(request, function(response,status){
        if (status === google.maps.DirectionsStatus.OK) {
            new google.maps.DirectionsRenderer({
                map: map,
                directions: response,
                suppressMarkers: true // デフォルトのマーカーを削除
            });
    
            //let leg = response.routes[0].legs[0];
            //makeMarker(leg.end_location, markers.goalMarker, map);
    
            // setTimeout(function(){
            //     map.setZoom(16); // ルート表示後にズーム率を変更
            // });
        }
    });


}



//------------------------------------------------------------------------------------
//こっちに上のデータを移植すれば？

function initMap_WayPoints() {

    // マップの生成
    initialize();

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
        //マーカーを立てる
        //temple_latlng = {lat:parseFloat(temple_lat[i]),lng:parseFloat(temple_lng[i])};
        waypoints_temple_marker[i] = new google.maps.Marker({
            position: {lat:parseFloat(waypoints_temple_lat[i]),lng:parseFloat(waypoints_temple_lng[i])},
            map: map
        });

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

    bounds = new google.maps.LatLngBounds();

    for (let i = 0; i < temple_name.length; i++) {//ピンを多数立てるためにリストの数だけ回す

        //マーカーを立てる
        //temple_latlng = {lat:parseFloat(temple_lat[i]),lng:parseFloat(temple_lng[i])};
        temple_marker[i] = new google.maps.Marker({
            position: {lat:parseFloat(temple_lat[i]),lng:parseFloat(temple_lng[i])},
            map: map
        });

        //全ての寺が表示されるようにzoom
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

// 地点を分割してルート検索を行います。
//-------------------------------------------------------------------------------
//現在あるもの
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
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
            
            (function(index){
                // ルート検索の条件
                var request = {
                    origin: origin, // 出発地
                    destination: dest, // 目的地
                    waypoints: waypoints, // 経由地
                    travelMode: google.maps.DirectionsTravelMode.WALKING, // 交通手段(歩行。DRIVINGの場合は車)
                };
                console.log(request);
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
            origin = points[i]; // 今回の目的地を次回の出発地にします。
            waypoints = [];
        }
        // 上記以外、waypointsに地点を追加
        else {
            waypoints.push({ location: points[i], stopover: true });
        }
    }

    // マーカーを表示する場合の準備
    var infoWindow = new google.maps.InfoWindow();
    var mark = function(position, content) {
        var marker = new google.maps.Marker({
            map: map, // 描画先の地図
            position: position // 座標
        });
        // クリック時吹き出しを表示
        marker.addListener("click", function(){
            infoWindow.setContent(content);
            infoWindow.open(map, marker);
        });
    };

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
                mark(leg.start_location, leg.start_address);
            }
        }
        // マーカーが必要ならマーカーを表示します。(最終)
        var endLeg = result.routes[0].legs[result.routes[0].legs.length-1];
        mark(endLeg.end_location, endLeg.end_address);

        // パスを描画します。
        var line = new google.maps.Polyline({
            map: map, // 描画先の地図
            strokeColor: "#2196f3", // 線の色
            strokeOpacity: 0.8, // 線の不透明度
            strokeWeight: 6, // 先の太さ
            path: path // 描画するパスデータ
        });
    }, 1000);
//-----------------------------------------------------------------------------------
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


// let rendererOptions = {
//     map: map, // 描画先の地図
//     draggable: true, // ドラッグ可
//     preserveViewport: true // centerの座標、ズームレベルで表示
// };

// let directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
// let directionsService = new google.maps.DirectionsService();
// directionsDisplay.setMap(map);

// let request = {
//     origin: new google.maps.LatLng(startLatLng[0], startLatLng[1]), // スタート地点
//     destination: new google.maps.LatLng(targetLatLng[0], targetLatLng[1]), // ゴール地点
//     travelMode: google.maps.DirectionsTravelMode.WALKING, // 移動手段
// };

// directionsService.route(request, function(response,status){
//     if (status === google.maps.DirectionsStatus.OK) {
//         new google.maps.DirectionsRenderer({
//             map: map,
//             directions: response,
//             suppressMarkers: true // デフォルトのマーカーを削除
//         });

//         let leg = response.routes[0].legs[0];
//         makeMarker(leg.end_location, markers.goalMarker, map);

//         setTimeout(function(){
//             map.setZoom(16); // ルート表示後にズーム率を変更
//         });
//     }
// });


