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
