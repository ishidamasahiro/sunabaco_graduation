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

//道の駅
let roadside_station_marker = [];//ピン

let roadside_station_address = [];//住所
//let convenience_number = [];//番号
let roadside_station_name = [];//名前
//let convenience_phone_number = [];//電話番号

let roadside_station_information = [];//吹き出しの中身
let roadside_station_information_html = [];//吹き出しのhtml
let roadside_station_infoWindow = [];//吹き出し

//dbへの入力でtext型のものはスペース以外全て全角で入力すること（htmlタグ以外は。少なくとも[](',)は使わない）
function initMap() {

    initialize(15);

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

    //マーカーの画像
    //image = "URL"の部分は公開するときのURLに合わせて変えなくてはならない
    //ここ以外のマーカー画像も同じく
    var image;
    if(temple_number < 10)
    {
        image = "http://127.0.0.1:5000/static/img/temples_pin/temple_pin0" + temple_number + ".png" 
        //console.log("temple_number < 10");
    }
    else{
        image = "http://127.0.0.1:5000/static/img/temples_pin/temple_pin" + temple_number + ".png" 
        //console.log("temple_number >= 10");
    }
    //console.log("image:::" + image);
    
    //マーカーを立てる
    temple_marker = new google.maps.Marker({
        position: temple_latlng,
        map: map,
        icon:{
            url:image,
            scaledSize : new google.maps.Size(50, 32)
        }
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

    //グルメのピン---------------------------------------------------------------------------------------------------------------------------------------------------------------
    // gourmet_element = values_to_list("gourmet");
    // gourmet_name = gourmet_element[0];

    //グルメの名前
    gourmet_name = valueToList("gourmet_name");

    //グルメの緯度
    gourmet_lat = valueToList("gourmet_lat");

    //グルメの経度
    gourmet_lng = valueToList("gourmet_lng");
    
    //グルメの電話番号
    gourmet_phone_number = valueToList("gourmet_phone_number");

    //グルメの情報
    gourmet_information = valueToList("gourmet_information");


    for (let i = 0; i < gourmet_name.length; i++) {//ピンを多数立てるためにリストの数だけ回す

        //マーカーを立てる
        gourmet_marker[i] = new google.maps.Marker({
            position: {lat:parseFloat(gourmet_lat[i]),lng:parseFloat(gourmet_lng[i])},
            map: map,
            icon:{
                url:"http://127.0.0.1:5000/static/img/gourmet_pin.png",
                scaledSize : new google.maps.Size(30, 41)
            }
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
    //宿の名前
    inn_name = valueToList("inn_name");

    //宿の電話番号
    inn_phone_number = valueToList("inn_phone_number");

    //宿の情報
    inn_information = valueToList("inn_information");

    //宿の緯度
    inn_lat = valueToList("inn_lat");

    //宿の経度
    inn_lng = valueToList("inn_lng");
    

    for (let i = 0; i < inn_name.length; i++) {//ピンを多数立てるためにリストの数だけ回す

        //マーカーを立てる
        inn_marker[i] = new google.maps.Marker({
            position: {lat:parseFloat(inn_lat[i]),lng:parseFloat(inn_lng[i])},
            map: map,
            icon:{
                url:"http://127.0.0.1:5000/static/img/inn_pin.png",
                scaledSize : new google.maps.Size(30, 41)
            }
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
    //コンビニの名前
    convenience_name = valueToList("convenience_name");

    //コンビニの緯度
    convenience_lat = valueToList("convenience_lat");

    //コンビニの経度
    convenience_lng = valueToList("convenience_lng");

    for (let i = 0; i < convenience_name.length; i++) {//ピンを多数立てるためにリストの数だけ回す

        //マーカーを立てる
        convenience_marker[i] = new google.maps.Marker({
            position: {lat:parseFloat(convenience_lat[i]),lng:parseFloat(convenience_lng[i])},
            map: map,
            icon:{
                url:"http://127.0.0.1:5000/static/img/convenience_pin.png",
                scaledSize : new google.maps.Size(30, 41)
            }
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
    //スポットの名前
    interesting_name = valueToList("interesting_name");

    //スポットの情報
    interesting_information = valueToList("interesting_information");

    //スポットの緯度
    interesting_lat = valueToList("interesting_lat");

    //スポットの経度
    interesting_lng = valueToList("interesting_lng");

    for (let i = 0; i < interesting_name.length; i++) {//ピンを多数立てるためにリストの数だけ回す

        //マーカーを立てる
        interesting_marker[i] = new google.maps.Marker({
            position: {lat:parseFloat(interesting_lat[i]),lng:parseFloat(interesting_lng[i])},
            map: map,
            icon:{
                url:"http://127.0.0.1:5000/static/img/interesting_pin.png",
                scaledSize : new google.maps.Size(30, 41)
            }
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

    // //道の駅のピン--------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //名前
    roadside_station_name = valueToList("roadside_station_name");
    
    //情報
    roadside_station_information = valueToList("roadside_station_information");

    //緯度
    roadside_station_lat = valueToList("roadside_station_lat");

    //経度
    roadside_station_lng = valueToList("roadside_station_lng");


    for (let i = 0; i < roadside_station_name.length; i++) {//ピンを多数立てるためにリストの数だけ回す

        //マーカーを立てる
        roadside_station_marker[i] = new google.maps.Marker({
            position: {lat:parseFloat(roadside_station_lat[i]),lng:parseFloat(roadside_station_lng[i])},
            map: map,
            icon:{
                url:"http://127.0.0.1:5000/static/img/roadside_pin.png",
                scaledSize : new google.maps.Size(30, 41)
            }
        });

        //吹き出し
        roadside_station_information_html[i] = "<div class='information'>" + roadside_station_name[i] + "<br>" + roadside_station_information[i] + "</div>";//informationをhtmlに変換
        roadside_station_infoWindow[i] = new google.maps.InfoWindow({
            content: roadside_station_information_html[i] // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
        });

        //マーカーをクリックしたとき吹き出しを表示
        roadside_station_marker[i].addListener('click', function() {
            roadside_station_infoWindow[i].open(map, roadside_station_marker[i]);
        });
    }

}


// //--------------------------------------------------------------------------
// //--------------------------------------------------------------------------