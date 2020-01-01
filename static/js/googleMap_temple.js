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

    //ピンを立てる----------
    for(let i = 0; i < gourmet_name.length; i++)
    {
        Property_markers(
            gourmet_marker,
            gourmet_lat,
            gourmet_lng,
            "gourmet",
            30,
            41,
            gourmet_information_html,
            gourmet_infoWindow,
            "<div class='information'>" + gourmet_name[i] + "<br>" + gourmet_information[i] + "<br>TEL:" + gourmet_phone_number[i] + "</div>",
            i
        );
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
    
    //ピンを立てる----------
    for(let i = 0; i < inn_name.length; i++)
    {
        Property_markers(
            inn_marker,
            inn_lat,
            inn_lng,
            "inn",
            30,
            41,
            inn_information_html,
            inn_infoWindow,
            "<div class='information'>" + inn_name[i] + "<br>" + inn_information[i] + "<br>TEL:" + inn_phone_number[i] + "</div>",
            i
        );
    }

    // //コンビニのピン--------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //コンビニの名前
    convenience_name = valueToList("convenience_name");

    //コンビニの緯度
    convenience_lat = valueToList("convenience_lat");

    //コンビニの経度
    convenience_lng = valueToList("convenience_lng");

    //ピンを立てる----------
    for(let i = 0; i < convenience_name.length; i++)
    {
        Property_markers(
            convenience_marker,
            convenience_lat,
            convenience_lng,
            "convenience",
            30,
            41,
            convenience_information_html,
            convenience_infoWindow,
            "<div class='information'>" + convenience_name[i] + "</div>",
            i
        );
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

    //ピンを立てる----------
    for(let i = 0; i < convenience_name.length; i++)
    {
        Property_markers(
            interesting_marker,
            interesting_lat,
            interesting_lng,
            "interesting",
            30,
            41,
            interesting_information_html,
            interesting_infoWindow,
            "<div class='information'>" + interesting_name[i] + "<br>" + interesting_information[i] + "</div>",
            i
        );
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


    //ピンを立てる----------
    for(let i = 0; i < roadside_station_name.length; i++)
    {
        Property_markers(
            roadside_station_marker,
            roadside_station_lat,
            roadside_station_lng,
            "roadside",
            30,
            41,
            roadside_station_information_html,
            roadside_station_infoWindow,
            "<div class='information'>" + roadside_station_name[i] + "<br>" + roadside_station_information[i] + "</div>",
            i
        );
    }
}
// //--------------------------------------------------------------------------
// //--------------------------------------------------------------------------