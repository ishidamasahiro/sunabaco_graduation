//let infoWindow = [];//吹き出し
let geocoder;//住所から座標を取得
let latlng;//住所から緯度経度を取得
let map;

let temple_marker;

let gourmet_marker = [];
//let gourmet_address_provisional = [];
//let gourmet_address_provisional2 = [];
let gourmet_address = [];
let gourmet_information = [];//グルメの吹き出しの中身
let gourmet_information_html = [];//グルメの吹き出し
let gourmet_infoWindow = [];

// let markerData = [ // マーカーを立てる場所名・住所
//     {
//         name: '八栗寺',
//         address: "香川県高松市牟礼町牟礼３４１６"
//     }, {
//         name: '山田屋',
//         address: "香川県高松市牟礼町牟礼３１８６"
//     }, {
//         name: '喫茶店',
//         address: "香川県高松市牟礼町牟礼３２１４−１"
//     }
// ];

function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
        zoom: 14,
        center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

//dbへの入力でtext型のものは全て全角で入力すること（html以外は。少なくとも[](',)スペース は使わない）
function initMap() {

    initialize();

    //寺のピンを立てる---------------------------------------------
    let temple_address = document.getElementById( "temple_address" ).value;//寺の住所
    let temple_information = document.getElementById( "temple_information" ).value;
    //console.log("temple_address:" + temple_address)
    geocoder.geocode({
        //"address" : markerData[i].address
         "address" : temple_address //座標を探す住所を入れる
    }, function(results, status) { // 結果
        if (status === google.maps.GeocoderStatus.OK) { // ステータスがOKの場合
            let bounds = new google.maps.LatLngBounds();
            latlng = results[0].geometry.location;
            bounds.extend(latlng);

            //ここまでしなくていい？
            // for (let i in results) {
            //     if (results[i].geometry) {
            //         // 緯度経度を取得
            //         latlng = results[i].geometry.location;
            //         // 検索結果地が含まれるように範囲を拡大
            //         bounds.extend(latlng);
            //     }
            // }
            //console.log(latlng);

            //地図の中心を設定
            map.setCenter(latlng);
            
            //マーカーを立てる
            temple_marker = new google.maps.Marker({
                position: latlng,
                map: map
            });

            // //吹き出し
            // var information = document.getElementById( "information" ).value;//吹き出しの説明文
            var temple_info_html = "<div class='information'>" + temple_information + "</div>";//informationをhtmlに変換
            // // console.log(info_html);
            let temple_infoWindow = new google.maps.InfoWindow({
                content: temple_info_html // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
            });

            //マーカーをクリックしたとき吹き出しを表示
            temple_marker.addListener('click', function() {
                temple_infoWindow.open(map, temple_marker);
            });

        } else { // 失敗した場合
            console.group('Error');
            console.log(results);
            console.log(status);
        }
    });

    //グルメのピン-----------------------------------------------------------
    //グルメの住所を受け取るが、文字列としてうけとってしまう
    gourmet_address = document.getElementById( "gourmet_address" ).value;
    //console.log("gourmet_address_provisional:" + gourmet_address_provisional);

    //なので含まれている記号で分けて配列化する
    //アドレスに記号が含まれていたら？まだわからん。
    gourmet_address = gourmet_address.split(/[(',)\s]/);
    //console.log("gourmet_address_provisional2:" + gourmet_address_provisional);

    //nullが大量に含まれた配列になるので抜き取る
    //最初と最後にどうしても無駄ができてしまうが今は気にせず
    gourmet_address = gourmet_address.filter(Boolean);
    //console.log("gourmet_address:" + gourmet_address);


    //グルメの情報
    gourmet_information = document.getElementById( "gourmet_information" ).value;
    //console.log("gourmet_address_provisional:" + gourmet_address_provisional);

    gourmet_information = gourmet_information.split(/[(',)\s]/);
    //console.log("gourmet_address_provisional2:" + gourmet_address_provisional);

    gourmet_information = gourmet_information.filter(Boolean);
    console.log("gourmet_information:" + gourmet_information);


    for (let i = 0; i < gourmet_address.length; i++) {//ピンを多数立てるためにリストの数だけ回す
        geocoder.geocode({
            "address" : gourmet_address[i]
            //"address" : temple_address //座標を探す住所を入れる
        }, function(results, status) { // 結果
            if (status === google.maps.GeocoderStatus.OK) { // ステータスがOKの場合
                let bounds = new google.maps.LatLngBounds();
                latlng = results[0].geometry.location;
                bounds.extend(latlng);

                //ここまでしなくていい？
                // for (let i in results) {
                //     if (results[i].geometry) {
                //         // 緯度経度を取得
                //         latlng = results[i].geometry.location;
                //         // 検索結果地が含まれるように範囲を拡大
                //         bounds.extend(latlng);
                //     }
                // }
                //console.log(latlng);

                //マーカーを立てる
                gourmet_marker[i] = new google.maps.Marker({
                    position: latlng,
                    map: map
                });

                //吹き出し
                //var information = document.getElementById( "information" ).value;//吹き出しの説明文
                gourmet_information_html[i] = "<div class='information'>" + gourmet_information[i] + "</div>";//informationをhtmlに変換
                // console.log(info_html);
                gourmet_infoWindow[i] = new google.maps.InfoWindow({
                    content: gourmet_information_html[i] // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
                });

                //マーカーをクリックしたとき吹き出しを表示
                gourmet_marker[i].addListener('click', function() {
                    gourmet_infoWindow[i].open(map, gourmet_marker[i]);
                });
    //-------------------------------------------------------------------------
            } else { // 失敗した場合
                console.group('Error');
                console.log(results);
                console.log(status);
            }

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