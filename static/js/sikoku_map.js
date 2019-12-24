
let temple_marker = [];//ピン
let img;//ピンの画像
let info_html = [];//吹き出しの中身html
let temple_infoWindow = [];//吹き出し

function initialize() {
    //geocoder = new google.maps.Geocoder();
    latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
        zoom: 7.8,
        center: latlng,
        styles:
        [
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
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [
                {
                    "visibility": "off"
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
                "elementType": "labels.text",
                "stylers": [
                {
                    "visibility": "off"
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
            }
        ]
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    //bounds = new google.maps.LatLngBounds();
}

//htmlから渡された変数を配列化する
function valueToList(value_id)
{
    var value_list = document.getElementById(value_id).value;
    value_list = value_list.split(/[(',)]/);//\sを加えればスペースもつぶせるがデータベース入力が手間
    value_list = value_list.filter(Boolean);
    return value_list;
}

//------------------------------------------------------------------------------------
function initMap() {

    // マップの生成
    initialize();
    bounds = new google.maps.LatLngBounds();

    //各種寺情報を配列化
    let all_temple_number = valueToList("all_temple_number");

    let all_temple_name = valueToList("all_temple_name");

    let all_temple_information = valueToList("all_temple_information");

    let all_temple_lat = valueToList("all_temple_lat");

    let all_temple_lng = valueToList("all_temple_lng");

    //地図の中心を四国の真ん中に設定
    map.setCenter({lat:33.731578,lng:133.496338});

    //88箇所にピンを立てる
    for(let i=0; i < all_temple_number.length ;i++)
    {
        //ピンの画像
        if(all_temple_number[i] < 10)
        {
            image = "http://127.0.0.1:5000/static/img/temples_pin/temple_pin0" + all_temple_number[i] + ".png" 
        }
        else{
            image = "http://127.0.0.1:5000/static/img/temples_pin/temple_pin" + all_temple_number[i] + ".png" 
        }

        //マーカーを立てる
        temple_marker[i] = new google.maps.Marker({
            position: {lat:parseFloat(all_temple_lat[i]),lng:parseFloat(all_temple_lng[i])},
            map: map,
            icon:{
                url:image,
                scaledSize : new google.maps.Size(25, 16)
            }
        });

        //吹き出し
        //中に各神社ページへのリンクを仕込む
        info_html[i] = "<div class='information'>" + all_temple_number[i] + "番札所:" + all_temple_name[i] + "<br>"+ all_temple_information[i] + "<br>" 
                        + "<form  action='/temple_search_select' method='post' value = '1'>" + "<input type = 'hidden' name = 'temple_number' value = " + "'" + all_temple_number[i] + "'" + ">" + "<input type = 'submit' name = 'link' value = 'お寺周辺へ'>" + "</form>" + "</div>";//informationをhtmlに変換
        // console.log(info_html);
        temple_infoWindow[i] = new google.maps.InfoWindow({
            content: info_html[i] // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
        });

        //マーカーをクリックしたとき吹き出しを表示
        temple_marker[i].addListener('click', function() {
            temple_infoWindow[i].open(map, temple_marker[i]);
        });
    }
    







}