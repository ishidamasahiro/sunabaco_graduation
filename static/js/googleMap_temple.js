let infoWindow;//吹き出し
let geocoder;//住所から座標を取得
let latlng;//住所から緯度経度を取得
let map;


//const variables = {};
// //要素を追加していく＝変数を生成する
// for(let i = 1; i <= len; i++){
//     variables['variable' + i] = 'value' + i;
// }



let marker = [];
//var infoWindow = [];
let markerData = [ // マーカーを立てる場所名・緯度・経度
    {
        name: '八栗寺',
        address: "香川県高松市牟礼町牟礼３４１６"
    }, {
        name: '山田屋',
        address: "香川県高松市牟礼町牟礼３１８６"
    }, {
        name: '喫茶店',
        address: "香川県高松市牟礼町牟礼３２１４−１"
    }
];

// // マーカー毎の処理
// for (var i = 0; i < markerData.length; i++) {
//     markerPosition = new google.maps.LatLng({lat: markerData[i]['lat'], lng: markerData[i]['lng']}); // 緯度経度のデータ作成
//         marker[i] = new google.maps.Marker({ // マーカーの追加
//             position: markerPosition, // マーカーを立てる位置を指定
//             map: map // マーカーを立てる地図を指定
//         });

//         infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
//             content: '<div class="sample">' + markerData[i]['name'] + '</div>' // 吹き出しに表示する内容
//         });

//     markerEvent(i); // マーカーにクリックイベントを追加
// }





function initMap() {
//--------------------------------------------------------------------------
//-------------------------------------------------------------------------
    geocoder = new google.maps.Geocoder();//座標取得の準備
    let address = document.getElementById( "address" ).value;//住所


    for (let i = 0; i < markerData.length; i++) {//ピンを多数立てるためにリストの数だけ回す
        geocoder.geocode({
            "address" : markerData[i].address
            // "address" : address //座標を探す住所を入れる
        }, function(results, status) { // 結果
            if (status === google.maps.GeocoderStatus.OK) { // ステータスがOKの場合
                let bounds = new google.maps.LatLngBounds();
                //latlng = results[0].geometry.location;
                //bounds.extend(latlng);

                //ここまでしなくていい？
                for (var i in results) {
                    if (results[i].geometry) {
                        // 緯度経度を取得
                        latlng = results[i].geometry.location;
                        // 検索結果地が含まれるように範囲を拡大
                        bounds.extend(latlng);
                    }
                }
                //console.log(latlng);

    //-------------------------------------------------------------------------
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 14,
                    center: latlng
                });

                //マーカーを立てる
                // console.log(latlng);
                // var mopts = {
                //     position: latlng,
                //     map: map
                // };
                // marker[i] = new google.maps.Marker(mopts);

                // //マーカーを立てる
                marker[i] = new google.maps.Marker({
                    position: latlng,
                    map: map
                });

                // //要素を追加していく＝変数を生成する
                // for(let i = 1; i <= len; i++){
                    // variables['marker' + i] = new google.maps.Marker({
                    //     position: latlng,
                    //     map: map
                    // });
                // }

                // //吹き出し
                // var information = document.getElementById( "information" ).value;//吹き出しの説明文
                // var info_html = "<div class='information'>" + information + "</div>";//informationをhtmlに変換
                // // console.log(info_html);
                // infoWindow = new google.maps.InfoWindow({
                //     content: info_html // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
                // });

                // //マーカーをクリックしたとき吹き出しを表示
                // marker.addListener('click', function() {
                //     infoWindow.open(map, marker);
                // });
    //-------------------------------------------------------------------------

            } else { // 失敗した場合
                console.group('Error');
                console.log(results);
                console.log(status);
            }
        });
    }

    // for(var i = 0; i < markerData.length; i++){
    //     console.log(marker[i]);
    // }
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

    // var lat = parseFloat(document.getElementById( "lat" ).value);//緯度
    // var lng = parseFloat(document.getElementById( "lng" ).value);//経度
    // var information = document.getElementById( "information" ).value;//吹き出しの説明文
    // //console.log(lat);
    // //console.log(lng);
    // //console.log(information);

    // //console.log(latlng);
    // //var place = latlng;
    // //console.log(place);
    // var place = {lat: lat, lng: lng};
    // //地図を表示して中心を指定した座標に
    // var map = new google.maps.Map(document.getElementById('map'), {
    //     zoom: 15,
    //     center: place
    // });

    // //マーカーを立てる
    // var marker = new google.maps.Marker({
    //     position: place,
    //     map: map
    // });

    // //吹き出し
    // var info_html = "<div class='information'>" + information + "</div>";//informationをhtmlに変換
    // // console.log(info_html);
    // infoWindow = new google.maps.InfoWindow({
    //     content: info_html // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
    // });

    // //マーカーをクリックしたとき吹き出しを表示
    // marker.addListener('click', function() {
    //     infoWindow.open(map, marker);
    // });

}