//let infoWindow = [];//吹き出し
//let geocoder;//住所から座標を取得
let latlng;//緯度経度を取得
let map;

let temple_marker;//寺のマーカー
let temple_latlng;//寺の緯度経度

//グルメ
let gourmet_marker = [];//グルメのピン

//let gourmet_address = [];//グルメの住所
//let gourmet_number = [];//グルメの番号
let gourmet_name = [];//グルメの名前
let gourmet_phone_number = [];//グルメの電話番号
let gourmet_lat = [];//グルメの緯度
let gourmet_lng = [];//グルメの経度

let gourmet_information = [];//グルメの吹き出しの中身
let gourmet_information_html = [];//グルメの吹き出しのhtml
let gourmet_infoWindow = [];//グルメの吹き出し

//宿
let inn_marker = [];//ピン

//let inn_address = [];//住所
//let gourmet_number = [];//番号
let inn_name = [];//名前
let inn_phone_number = [];//電話番号
let inn_lat = [];//緯度
let inn_lng = [];//経度

let inn_information = [];//吹き出しの中身
let inn_information_html = [];//吹き出しのhtml
let inn_infoWindow = [];//吹き出し

//コンビニ
let convenience_marker = [];//ピン

let convenience_address = [];//住所
//let convenience_number = [];//番号
let convenience_name = [];//名前
//let convenience_phone_number = [];//電話番号

let convenience_information = [];//吹き出しの中身
let convenience_information_html = [];//吹き出しのhtml
let convenience_infoWindow = [];//吹き出し

//面白
let interesting_marker = [];//ピン

let interesting_address = [];//住所
//let convenience_number = [];//番号
let interesting_name = [];//名前
//let convenience_phone_number = [];//電話番号

let interesting_information = [];//吹き出しの中身
let interesting_information_html = [];//吹き出しのhtml
let interesting_infoWindow = [];//吹き出し

//mapの初期化
function initialize() {
    //geocoder = new google.maps.Geocoder();
    latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
        zoom: 14,
        center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

//dbへの入力でtext型のものはスペース以外全て全角で入力すること（htmlタグ以外は。少なくとも[](',)は使わない）
function initMap() {

    initialize();

    //寺のピンを立てる------------------------------------------------------------------------------------------------------------------------------------------------
    //let temple_address = document.getElementById( "temple_address" ).value;//寺の住所
    let temple_number = document.getElementById( "temple_number" ).value;//寺の番号
    let temple_name = document.getElementById( "temple_name" ).value;//寺の名前
    let temple_information = document.getElementById( "temple_information" ).value;//寺の情報
    let temple_lat = parseFloat(document.getElementById( "temple_lat" ).value);//寺の経度
    let temple_lng = parseFloat(document.getElementById( "temple_lng" ).value);//寺の緯度
    //let temple_phone_number = document.getElementById( "temple_phone_number" ).value;//寺の電話番号

    //console.log("lat lng:" + temple_lat + ":" + temple_lng);

    temple_latlng = {lat:temple_lat,lng:temple_lng};
    //console.log("place:" + place["lat"])

    //地図の中心に設定
    map.setCenter(temple_latlng);

    // //地図を表示して中心を指定した座標に
    // map = new google.maps.Map(document.getElementById('map'), {
    //     zoom: 14,
    //     center: place
    // });
    //マーカーを立てる
    temple_marker = new google.maps.Marker({
        position: temple_latlng,
        map: map
    });

    //吹き出し
    let info_html = "<div class='information'>" + temple_number + "番札所:" + temple_name + "<br>"+ temple_information + "</div>";//informationをhtmlに変換
    // console.log(info_html);
    let temple_infoWindow = new google.maps.InfoWindow({
        content: info_html // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
    });

    //マーカーをクリックしたとき吹き出しを表示
    temple_marker.addListener('click', function() {
        temple_infoWindow.open(map, temple_marker);
    });


    // geocoder.geocode({
    //     //"address" : markerData[i].address
    //      "address" : temple_address //座標を探す住所を入れる
    // }, function(results, status) { // 結果

    //     console.log("temple_address:" + interesting_address);
    //     console.log("google.maps.GeocoderStatus");
    //     console.log(status === google.maps.GeocoderStatus.OK);
    //     console.log("before");

    //     if (status === google.maps.GeocoderStatus.OK) { // ステータスがOKの場合
    //         let bounds = new google.maps.LatLngBounds();
    //         latlng = results[0].geometry.location;
    //         bounds.extend(latlng);

    //         //ここまでしなくていい？
    //         // for (let i in results) {
    //         //     if (results[i].geometry) {
    //         //         // 緯度経度を取得
    //         //         latlng = results[i].geometry.location;
    //         //         // 検索結果地が含まれるように範囲を拡大
    //         //         bounds.extend(latlng);
    //         //     }
    //         // }
    //         //console.log(latlng);

    //         //地図の中心を設定
    //         map.setCenter(latlng);
    
    //         //マーカーを立てる
    //         temple_marker = new google.maps.Marker({
    //             position: latlng,
    //             map: map
    //         });

    //         // //吹き出し
    //         // var information = document.getElementById( "information" ).value;//吹き出しの説明文
    //         var temple_info_html = "<div class='information'>" + temple_number + "番札所:" + temple_name + "<br>電話番号:"+ temple_phone_number + "<br>" + temple_information + "</div>";//informationをhtmlに変換
    //         // // console.log(info_html);
    //         let temple_infoWindow = new google.maps.InfoWindow({
    //             content: temple_info_html // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
    //         });

    //         //マーカーをクリックしたとき吹き出しを表示
    //         temple_marker.addListener('click', function() {
    //             temple_infoWindow.open(map, temple_marker);
    //         });

    //     } else { // 失敗した場合
    //         console.group('Error');
    //         console.log(results);
    //         console.log(status);
    //     }
    // });

    //グルメのピン---------------------------------------------------------------------------------------------------------------------------------------------------------------
    //グルメの住所を受け取るが、文字列としてうけとってしまう
    //gourmet_address = document.getElementById( "gourmet_address" ).value;
    //console.log("gourmet_address_provisional:" + gourmet_address_provisional);

    //なので含まれている記号で分けて配列化する
    //アドレスに記号が含まれていたら？まだわからん。
    //gourmet_address = gourmet_address.split(/[(',)\s]/);
    //console.log("gourmet_address_provisional2:" + gourmet_address_provisional);

    //nullが大量に含まれた配列になるので抜き取る
    //最初と最後にどうしても無駄ができてしまうが今は気にせず
    //gourmet_address = gourmet_address.filter(Boolean);
    //console.log("gourmet_address:" + gourmet_address);


    //グルメの寺番号
    // gourmet_number = document.getElementById( "gourmet_number" ).value;

    // gourmet_number = gourmet_number.split(/[(',)\s]/);

    // gourmet_number = gourmet_number.filter(Boolean);


    //グルメの名前
    gourmet_name = document.getElementById( "gourmet_name" ).value;

    gourmet_name = gourmet_name.split(/[(',)]/);

    gourmet_name = gourmet_name.filter(Boolean);
    //console.log("gourmet_name:" + gourmet_name);

    //グルメの緯度
    gourmet_lat = document.getElementById( "gourmet_lat" ).value;

    gourmet_lat = gourmet_lat.split(/[(',)]/);

    gourmet_lat = gourmet_lat.filter(Boolean);

    //グルメの経度
    gourmet_lng = document.getElementById( "gourmet_lng" ).value;

    gourmet_lng = gourmet_lng.split(/[(',)]/);

    gourmet_lng = gourmet_lng.filter(Boolean);


    //グルメの電話番号
    gourmet_phone_number = document.getElementById( "gourmet_phone_number" ).value;

    gourmet_phone_number = gourmet_phone_number.split(/[(',)]/);

    gourmet_phone_number = gourmet_phone_number.filter(Boolean);


    //グルメの情報
    gourmet_information = document.getElementById( "gourmet_information" ).value;
    //console.log("gourmet_address_provisional:" + gourmet_address_provisional);

    gourmet_information = gourmet_information.split(/[(',)]/);
    //console.log("gourmet_address_provisional2:" + gourmet_address_provisional);

    gourmet_information = gourmet_information.filter(Boolean);
    //console.log("gourmet_information:" + gourmet_information);


    for (let i = 0; i < gourmet_name.length; i++) {//ピンを多数立てるためにリストの数だけ回す

        //マーカーを立てる
        gourmet_marker[i] = new google.maps.Marker({
            position: {lat:parseFloat(gourmet_lat[i]),lng:parseFloat(gourmet_lng[i])},
            map: map
        });

        //吹き出し
        //var information = document.getElementById( "information" ).value;//吹き出しの説明文
        gourmet_information_html[i] = "<div class='information'>" + gourmet_name[i] + "<br>" + gourmet_information[i] + "<br>TEL:" + gourmet_phone_number[i] + "</div>";//informationをhtmlに変換
        // console.log(info_html);
        gourmet_infoWindow[i] = new google.maps.InfoWindow({
            content: gourmet_information_html[i] // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
        });

        //マーカーをクリックしたとき吹き出しを表示
        gourmet_marker[i].addListener('click', function() {
            gourmet_infoWindow[i].open(map, gourmet_marker[i]);
        });
    }

    
    // //宿のピン--------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // //宿の住所
    // inn_address = document.getElementById( "inn_address" ).value;

    // inn_address = inn_address.split(/[(',)\s]/);

    // inn_address = inn_address.filter(Boolean);


    //宿の名前
    inn_name = document.getElementById( "inn_name" ).value;

    inn_name = inn_name.split(/[(',)]/);

    inn_name = inn_name.filter(Boolean);


    //宿の電話番号
    inn_phone_number = document.getElementById( "inn_phone_number" ).value;

    inn_phone_number = inn_phone_number.split(/[(',)]/);

    inn_phone_number = inn_phone_number.filter(Boolean);


    //宿の情報
    inn_information = document.getElementById( "inn_information" ).value;

    inn_information = inn_information.split(/[(',)]/);

    inn_information = inn_information.filter(Boolean);


    //宿の緯度
    inn_lat = document.getElementById( "inn_lat" ).value;

    inn_lat = inn_lat.split(/[(',)]/);

    inn_lat = inn_lat.filter(Boolean);

    //宿の経度
    inn_lng = document.getElementById( "inn_lng" ).value;

    inn_lng = inn_lng.split(/[(',)]/);

    inn_lng = inn_lng.filter(Boolean);

    for (let i = 0; i < inn_name.length; i++) {//ピンを多数立てるためにリストの数だけ回す

        //マーカーを立てる
        inn_marker[i] = new google.maps.Marker({
            position: {lat:parseFloat(inn_lat[i]),lng:parseFloat(inn_lng[i])},
            map: map
        });

        //吹き出し
        inn_information_html[i] = "<div class='information'>" + inn_name[i] + "<br>" + inn_information[i] + "<br>TEL:" + inn_phone_number[i] + "</div>";//informationをhtmlに変換
        inn_infoWindow[i] = new google.maps.InfoWindow({
            content: inn_information_html[i] // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
        });

        //マーカーをクリックしたとき吹き出しを表示
        inn_marker[i].addListener('click', function() {
            inn_infoWindow[i].open(map, inn_marker[i]);
        });
    }

    // //コンビニのピン--------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // //コンビニの住所
    // convenience_address = document.getElementById( "convenience_address" ).value;

    // convenience_address = convenience_address.split(/[(',)\s]/);

    // convenience_address = convenience_address.filter(Boolean);
    // //console.log("convenience_address:" + convenience_address);


    //コンビニの名前
    convenience_name = document.getElementById( "convenience_name" ).value;

    convenience_name = convenience_name.split(/[(',)]/);

    convenience_name = convenience_name.filter(Boolean);

    //コンビニの緯度
    convenience_lat = document.getElementById( "convenience_lat" ).value;

    convenience_lat = convenience_lat.split(/[(',)]/);

    convenience_lat = convenience_lat.filter(Boolean);

    //コンビニの経度
    convenience_lng = document.getElementById( "convenience_lng" ).value;

    convenience_lng = convenience_lng.split(/[(',)]/);

    convenience_lng = convenience_lng.filter(Boolean);


    for (let i = 0; i < convenience_name.length; i++) {//ピンを多数立てるためにリストの数だけ回す

        //マーカーを立てる
        convenience_marker[i] = new google.maps.Marker({
            position: {lat:parseFloat(convenience_lat[i]),lng:parseFloat(convenience_lng[i])},
            map: map
        });

        //吹き出し
        convenience_information_html[i] = "<div class='information'>" + convenience_name[i] + "</div>";//informationをhtmlに変換
        convenience_infoWindow[i] = new google.maps.InfoWindow({
            content: convenience_information_html[i] // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
        });

        //マーカーをクリックしたとき吹き出しを表示
        convenience_marker[i].addListener('click', function() {
            convenience_infoWindow[i].open(map, convenience_marker[i]);
        });
    }

    // //スポットのピン--------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // //面白の住所
    // interesting_address = document.getElementById( "interesting_address" ).value;

    // interesting_address = interesting_address.split(/[(',)\s]/);

    // interesting_address = interesting_address.filter(Boolean);
    // console.log("interesting_address:" + interesting_address);


    //スポットの名前
    interesting_name = document.getElementById( "interesting_name" ).value;

    interesting_name = interesting_name.split(/[(',)]/);

    interesting_name = interesting_name.filter(Boolean);


    //スポットの情報
    interesting_information = document.getElementById( "interesting_information" ).value;

    interesting_information = interesting_information.split(/[(',)]/);

    interesting_information = interesting_information.filter(Boolean);

    //スポットの緯度
    interesting_lat = document.getElementById( "interesting_lat" ).value;

    interesting_lat = interesting_lat.split(/[(',)]/);

    interesting_lat = interesting_lat.filter(Boolean);

    //スポットの経度
    interesting_lng = document.getElementById( "interesting_lng" ).value;

    interesting_lng = interesting_lng.split(/[(',)]/);

    interesting_lng = interesting_lng.filter(Boolean);

    for (let i = 0; i < interesting_name.length; i++) {//ピンを多数立てるためにリストの数だけ回す

        //マーカーを立てる
        interesting_marker[i] = new google.maps.Marker({
            position: {lat:parseFloat(interesting_lat[i]),lng:parseFloat(interesting_lng[i])},
            map: map
        });

        //吹き出し
        interesting_information_html[i] = "<div class='information'>" + interesting_name[i] + "<br>" + interesting_information[i] + "</div>";//informationをhtmlに変換
        interesting_infoWindow[i] = new google.maps.InfoWindow({
            content: interesting_information_html[i] // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
        });

        //マーカーをクリックしたとき吹き出しを表示
        interesting_marker[i].addListener('click', function() {
            interesting_infoWindow[i].open(map, interesting_marker[i]);
        });
    }

}


// //--------------------------------------------------------------------------
// //--------------------------------------------------------------------------

//     // var lat = parseFloat(document.getElementById( "lat" ).value);//緯度
//     // var lng = parseFloat(document.getElementById( "lng" ).value);//経度
//     // var information = document.getElementById( "information" ).value;//吹き出しの説明文
//     // //console.log(lat);
//     // //console.log(lng);
//     // //console.log(information);

//     // //console.log(latlng);
//     // //var place = latlng;
//     // //console.log(place);
//     // var place = {lat: lat, lng: lng};
//     // //地図を表示して中心を指定した座標に
//     // var map = new google.maps.Map(document.getElementById('map'), {
//     //     zoom: 15,
//     //     center: place
//     // });

//     // //マーカーを立てる
//     // var marker = new google.maps.Marker({
//     //     position: place,
//     //     map: map
//     // });

//     // //吹き出し
//     // var info_html = "<div class='information'>" + information + "</div>";//informationをhtmlに変換
//     // // console.log(info_html);
//     // infoWindow = new google.maps.InfoWindow({
//     //     content: info_html // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
//     // });

//     // //マーカーをクリックしたとき吹き出しを表示
//     // marker.addListener('click', function() {
//     //     infoWindow.open(map, marker);
//     // });