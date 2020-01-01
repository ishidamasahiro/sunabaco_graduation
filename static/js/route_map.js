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
//let testlist = ["さかな"];

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

//------------------------------------------------------------------------------------
function initMap_WayPoints() {

    // test(testlist);
    // console.log("testlist:::" + testlist);

    // マップの生成
    initialize(16);
    bounds = new google.maps.LatLngBounds();

    //物件のピンを立てる-------------------------------------------------------

    //寺周辺の物件情報------------------------
    //グルメ----------
    SandG_gourmet_element = values_to_list("SandG_gourmet");
    SandG_gourmet_name = SandG_gourmet_element[0];
    SandG_gourmet_lat = SandG_gourmet_element[1];
    SandG_gourmet_lng = SandG_gourmet_element[2];
    SandG_gourmet_information = SandG_gourmet_element[3];
    SandG_gourmet_phone_number = SandG_gourmet_element[4];
    
    //ピンを立てる----------
    for(let i = 0; i < SandG_gourmet_name.length; i++)
    {
        Property_markers(
            SandG_gourmet_marker,
            SandG_gourmet_lat,
            SandG_gourmet_lng,
            "gourmet",
            20,
            27,
            SandG_gourmet_information_html,
            SandG_gourmet_infoWindow,
            "<div class='information'>"+ SandG_gourmet_name[i] + "<br>" + SandG_gourmet_information[i] + "<br>TELL:" + SandG_gourmet_phone_number[i] + "</div>",
            i
        );
    }

    //宿----------
    SandG_inn_element = values_to_list("SandG_inn");
    SandG_inn_name = SandG_inn_element[0];
    SandG_inn_lat = SandG_inn_element[1];
    SandG_inn_lng = SandG_inn_element[2];
    SandG_inn_information = SandG_inn_element[3];
    SandG_inn_phone_number = SandG_inn_element[4];

    //ピンを立てる----------
    for(let i = 0; i < SandG_inn_name.length; i++)
    {
        Property_markers(
            SandG_inn_marker,
            SandG_inn_lat,
            SandG_inn_lng,
            "inn",
            20,
            27,
            SandG_inn_information_html,
            SandG_inn_infoWindow,
            "<div class='information'>"+ SandG_inn_name[i] + "<br>" + SandG_inn_information[i] + "<br>TELL:" + SandG_inn_phone_number[i] + "</div>",
            i
        );
    }

    //道の駅----------
    SandG_roadside_station_name = valueToList("SandG_roadside_station_name");
    SandG_roadside_station_lat = valueToList("SandG_roadside_station_lat");
    SandG_roadside_station_lng = valueToList("SandG_roadside_station_lng");
    SandG_roadside_station_information = valueToList("SandG_roadside_station_information");

    //ピンを立てる----------
    for(let i = 0; i < SandG_roadside_station_name.length; i++)
    {
        Property_markers(
            SandG_roadside_station_marker,
            SandG_roadside_station_lat,
            SandG_roadside_station_lng,
            "roadside",
            20,
            27,
            SandG_roadside_station_information_html,
            SandG_roadside_station_infoWindow,
            "<div class='information'>"+ SandG_roadside_station_name[i] + "<br>" + SandG_roadside_station_information[i] + "</div>",
            i
        );
    }


    //スポット----------
    //SandG_interesting_element = values_to_list("SandG_interesting");
    SandG_interesting_name = valueToList("SandG_interesting_name");
    SandG_interesting_lat = valueToList("SandG_interesting_lat");
    SandG_interesting_lng = valueToList("SandG_interesting_lng");
    SandG_interesting_information = valueToList("SandG_interesting_information");
    //SandG_inn_phone_number = SandG_inn_element[4];

    //ピンを立てる----------
    for(let i = 0; i < SandG_interesting_name.length; i++)
    {
        Property_markers(
            SandG_interesting_marker,
            SandG_interesting_lat,
            SandG_interesting_lng,
            "interesting",
            20,
            27,
            SandG_interesting_information_html,
            SandG_interesting_infoWindow,
            "<div class='information'>"+ SandG_interesting_name[i] + "<br>" + SandG_interesting_information[i] + "</div>",
            i
        );
    }

    //コンビニ----------
    SandG_convenience_name = valueToList("SandG_convenience_name");
    SandG_convenience_lat = valueToList("SandG_convenience_lat");
    SandG_convenience_lng = valueToList("SandG_convenience_lng");
    //SandG_convenience_information = valueToList("SandG_convenience_name");

    //ピンを立てる----------
    for(let i = 0; i < SandG_convenience_name.length; i++)
    {
        Property_markers(
            SandG_convenience_marker,
            SandG_convenience_lat,
            SandG_convenience_lng,
            "convenience",
            20,
            27,
            SandG_convenience_information_html,
            SandG_convenience_infoWindow,
            "<div class='information'>"+ SandG_convenience_name[i] + "</div>",
            i
        );
    }

    //-----------------------------------------------------------
    //ルート中の物件情報---------------------------

    //グルメ
    route_gourmet_element = values_to_list("route_gourmet");
    route_gourmet_name = route_gourmet_element[0];
    route_gourmet_lat = route_gourmet_element[1];
    route_gourmet_lng = route_gourmet_element[2];
    route_gourmet_information = route_gourmet_element[3];
    route_gourmet_phone_number = route_gourmet_element[4];

    //ピンを立てる----------
    for(let i = 0; i < route_gourmet_name.length; i++)
    {
        Property_markers(
            route_gourmet_marker,
            route_gourmet_lat,
            route_gourmet_lng,
            "gourmet",
            20,
            27,
            route_gourmet_information_html,
            route_gourmet_infoWindow,
            "<div class='information'>"+ route_gourmet_name[i] + "<br>" + route_gourmet_information[i] + "<br>TELL:" + route_gourmet_phone_number[i] + "</div>",
            i
        );
    }

    //宿
    route_inn_element = values_to_list("route_inn");
    route_inn_name = route_inn_element[0];
    route_inn_lat = route_inn_element[1];
    route_inn_lng = route_inn_element[2];
    route_inn_information = route_inn_element[3];
    route_inn_phone_number = route_inn_element[4];

    //ピンを立てる----------
    for(let i = 0; i < route_inn_name.length; i++)
    {
        Property_markers(
            route_inn_marker,
            route_inn_lat,
            route_inn_lng,
            "inn",
            20,
            27,
            route_inn_information_html,
            route_inn_infoWindow,
            "<div class='information'>"+ route_inn_name[i] + "<br>" + route_inn_information[i] + "<br>TELL:" + route_inn_phone_number[i] + "</div>",
            i
        );
    }

    //道の駅
    route_roadside_station_name = valueToList("route_roadside_station_name");
    route_roadside_station_lat = valueToList("route_roadside_station_lat");
    route_roadside_station_lng = valueToList("route_roadside_station_lng");
    route_roadside_station_information = valueToList("route_roadside_station_information");

    //ピンを立てる----------
    for(let i = 0; i < route_roadside_station_name.length; i++)
    {
        Property_markers(
            route_roadside_station_marker,
            route_roadside_station_lat,
            route_roadside_station_lng,
            "roadside",
            20,
            27,
            route_roadside_station_information_html,
            route_roadside_station_infoWindow,
            "<div class='information'>"+ route_roadside_station_name[i] + "<br>" + route_roadside_station_information[i] + "</div>",
            i
        );
    }

    //スポット
    route_interesting_name = valueToList("route_interesting_name");
    route_interesting_lat = valueToList("route_interesting_lat");
    route_interesting_lng = valueToList("route_interesting_lng");
    route_interesting_information = valueToList("route_interesting_information");

    //ピンを立てる----------
    for(let i = 0; i < route_interesting_name.length; i++)
    {
        Property_markers(
            route_interesting_marker,
            route_interesting_lat,
            route_interesting_lng,
            "interesting",
            20,
            27,
            route_interesting_information_html,
            route_interesting_infoWindow,
            "<div class='information'>"+ route_interesting_name[i] + "<br>" + route_interesting_information[i] + "</div>",
            i
        );
    }

    //コンビニ
    route_convenience_name = valueToList("route_convenience_name");
    route_convenience_lat = valueToList("route_convenience_lat");
    route_convenience_lng = valueToList("route_convenience_lng");
    //route_convenience_information = valueToList("route_convenience_information");

    //ピンを立てる----------
    for(let i = 0; i < route_convenience_name.length; i++)
    {
        Property_markers(
            route_convenience_marker,
            route_convenience_lat,
            route_convenience_lng,
            "convenience",
            20,
            27,
            route_convenience_information_html,
            route_convenience_infoWindow,
            "<div class='information'>"+ route_convenience_name[i] + "</div>",
            i
        );
    }

    //経由地の情報---------------------------------------------------------------------
    waypoints_temple_number = valueToList("waypoints_temple_number");
    waypoints_temple_name = valueToList("waypoints_temple_name");
    waypoints_temple_lat = valueToList("waypoints_temple_lat");
    waypoints_temple_lng = valueToList("waypoints_temple_lng");
    waypoints_temple_information = valueToList("waypoints_temple_information");

    var strmaekakko = "[";
    var strusirokakko = "]";
    var strspace = " ";
    //var test = "aaaaa".normalize();
    //console.log(test);

    //途中の寺の座標をリスト化
    for(var i = 0; i <= waypoints_temple_lat.length; i++)
    {
        //余計な記号は削除
        //console.log("waypoints_temple_lat:::" + waypoints_temple_lat);
        //console.log("waypoints_temple_lat.length:::" + waypoints_temple_lat.length);
        //console.log("in:" + i);
        if(String(waypoints_temple_lat[i]) != strmaekakko &&
            String(waypoints_temple_lat[i]) != strusirokakko &&
            String(waypoints_temple_lat[i]) != strspace &&
            waypoints_temple_lat[i] != null)
        {
            //console.log(String(waypoints_temple_lat) == '[');
            //console.log("ok" + i);
            //console.log("waypoints_temple_lat[i]:::" + waypoints_temple_lat[i]);
            //console.log("waypoints_temple_lng[i]:::" + waypoints_temple_lng[i]);

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
    temple_number = valueToList("temple_number");
    temple_name = valueToList("temple_name");
    temple_lat = valueToList("temple_lat");
    temple_lng = valueToList("temple_lng");
    temple_information = valueToList("temple_information");

    // //寺番号
    // temple_number = document.getElementById( "temple_number" ).value;
    // temple_number = temple_number.split(/[(',)]/);
    // temple_number = temple_number.filter(Boolean);

    // //名前
    // temple_name = document.getElementById( "temple_name" ).value;
    // temple_name = temple_name.split(/[(',)]/);
    // temple_name = temple_name.filter(Boolean);

    // //情報
    // temple_information = document.getElementById( "temple_information" ).value;
    // temple_information = temple_information.split(/[(',)]/);
    // temple_information = temple_information.filter(Boolean);

    // //緯度
    // temple_lat = document.getElementById( "temple_lat" ).value;
    // temple_lat = temple_lat.split(/[(',)]/);
    // temple_lat = temple_lat.filter(Boolean);

    // //経度
    // temple_lng = document.getElementById( "temple_lng" ).value;
    // temple_lng = temple_lng.split(/[(',)]/);
    // temple_lng = temple_lng.filter(Boolean);

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


