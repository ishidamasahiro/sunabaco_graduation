//マップの初期化
function initialize(zoomLevel) {
    //geocoder = new google.maps.Geocoder();
    latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
        zoom: zoomLevel,
        center: latlng,
        gestureHandling: "greedy",
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
    //console.log("inininini")
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    //bounds = new google.maps.LatLngBounds();
}

//htmlから渡された変数を配列化する
function valueToList(value_id)
{
    //文字列としてうけとってしまう
    var value_list = document.getElementById(value_id).value;

    //なので含まれている記号で分けて配列化する
    //アドレスに記号が含まれていたら？まだわからん。
    value_list = value_list.split(/[(',)]/);//\sを加えればスペースもつぶせるがデータベース入力が手間
    
    //nullが大量に含まれた配列になるので抜き取る
    //最初と最後にどうしても無駄ができてしまうが今は気にせず
    value_list = value_list.filter(Boolean);
    return value_list;
}

//作ったはいいがそんなに手間は変わらん気がする
//そのうえない要素（電話番号とか）がエラーになる。使いどころが限られる。
function values_to_list(valueName)
{
    let name = [];
    let lat = [];
    let lng = [];
    let information = [];
    let phone_number = [];
    //let temple_number = [];

    name = valueToList(valueName + "_name");
    //console.log(name);
    lat = valueToList(valueName + "_lat");
    lng = valueToList(valueName + "_lng");
    information = valueToList(valueName + "_information");
    phone_number = valueToList(valueName + "_phone_number");
    //temple_number = valueToList(valueName + "_temple_number");

    return [name,lat,lng,information,phone_number];
}


//[0]を指定すれば書き変わる
// function test(list)
// {
//     console.log("list1:::" + list);
//     list[0] = "やさい";
//     console.log("list2:::" + list);
// }


//寺以外のピン
function Property_markers
(
    Property_marker,
    Property_lat,
    Property_lng,
    pin_name,
    width,
    height,
    Property_information_html,
    Property_infoWindow,
    html,
    i
)
{
    //マーカーを立てる
    Property_marker[i] = new google.maps.Marker({
        position: {lat:parseFloat(Property_lat[i]),lng:parseFloat(Property_lng[i])},
        map: map,
        icon:{
            url:"http://127.0.0.1:5000/static/img/" + pin_name + "_pin.png",
            scaledSize : new google.maps.Size(width, height)
        }
    });

    //吹き出し
    Property_information_html[i] = html;
    Property_infoWindow[i] = new google.maps.InfoWindow({
        content: Property_information_html[i] // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
    });

    //マーカーをクリックしたとき吹き出しを表示
    Property_marker[i].addListener('click', function() {
        Property_infoWindow[i].open(map, Property_marker[i]);
    });
}
