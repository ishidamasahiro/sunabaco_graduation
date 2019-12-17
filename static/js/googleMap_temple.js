//let infoWindow = [];//吹き出し
let geocoder;//住所から座標を取得
let latlng;//住所から緯度経度を取得
let map;

let temple_marker;

//グルメ
let gourmet_marker = [];//グルメのピン

let gourmet_address = [];//グルメの住所
//let gourmet_number = [];//グルメの番号
let gourmet_name = [];//グルメの名前
let gourmet_phone_number = [];//グルメの電話番号

let gourmet_information = [];//グルメの吹き出しの中身
let gourmet_information_html = [];//グルメの吹き出しのhtml
let gourmet_infoWindow = [];//グルメの吹き出し

//宿
let inn_marker = [];//ピン

let inn_address = [];//住所
//let gourmet_number = [];//番号
let inn_name = [];//名前
let inn_phone_number = [];//電話番号

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
    geocoder = new google.maps.Geocoder();
    latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
        zoom: 14,
        center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

//dbへの入力でtext型のものは全て全角で入力すること（html以外は。少なくとも[](',)スペース は使わない）
function initMap() {

    initialize();

    //寺のピンを立てる------------------------------------------------------------------------------------------------------------------------------------------------
    let temple_address = document.getElementById( "temple_address" ).value;//寺の住所
    let temple_number = document.getElementById( "temple_number" ).value;//寺の番号
    let temple_name = document.getElementById( "temple_name" ).value;//寺の名前
    let temple_information = document.getElementById( "temple_information" ).value;//寺の情報
    let temple_phone_number = document.getElementById( "temple_phone_number" ).value;//寺の電話番号

    //console.log("temple_address:" + temple_address)
    geocoder.geocode({
        //"address" : markerData[i].address
         "address" : temple_address //座標を探す住所を入れる
    }, function(results, status) { // 結果

        console.log("temple_address:" + interesting_address);
        console.log("google.maps.GeocoderStatus");
        console.log(status === google.maps.GeocoderStatus.OK);
        console.log("before");

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
            var temple_info_html = "<div class='information'>" + temple_number + "番札所:" + temple_name + "<br>電話番号:"+ temple_phone_number + "<br>" + temple_information + "</div>";//informationをhtmlに変換
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

    //グルメのピン---------------------------------------------------------------------------------------------------------------------------------------------------------------
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


    //グルメの寺番号
    // gourmet_number = document.getElementById( "gourmet_number" ).value;

    // gourmet_number = gourmet_number.split(/[(',)\s]/);

    // gourmet_number = gourmet_number.filter(Boolean);


    //グルメの名前
    gourmet_name = document.getElementById( "gourmet_name" ).value;

    gourmet_name = gourmet_name.split(/[(',)\s]/);

    gourmet_name = gourmet_name.filter(Boolean);


    //グルメの電話番号
    gourmet_phone_number = document.getElementById( "gourmet_phone_number" ).value;

    gourmet_phone_number = gourmet_phone_number.split(/[(',)\s]/);

    gourmet_phone_number = gourmet_phone_number.filter(Boolean);


    //グルメの情報
    gourmet_information = document.getElementById( "gourmet_information" ).value;
    //console.log("gourmet_address_provisional:" + gourmet_address_provisional);

    gourmet_information = gourmet_information.split(/[(',)\s]/);
    //console.log("gourmet_address_provisional2:" + gourmet_address_provisional);

    gourmet_information = gourmet_information.filter(Boolean);
    //console.log("gourmet_information:" + gourmet_information);


    for (let i = 0; i < gourmet_address.length; i++) {//ピンを多数立てるためにリストの数だけ回す
        geocoder.geocode({
            "address" : gourmet_address[i]
        }, function(results, status) { // 結果
            if (status === google.maps.GeocoderStatus.OK) { // ステータスがOKの場合
                let bounds = new google.maps.LatLngBounds();
                latlng = results[0].geometry.location;
                bounds.extend(latlng);

                //マーカーを立てる
                gourmet_marker[i] = new google.maps.Marker({
                    position: latlng,
                    map: map
                });

                //吹き出し
                //var information = document.getElementById( "information" ).value;//吹き出しの説明文
                gourmet_information_html[i] = "<div class='information'>" + gourmet_name[i] + "<br>電話番号:"+ gourmet_phone_number[i] + "<br>" + gourmet_information[i] + "</div>";//informationをhtmlに変換
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

    //宿のピン--------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //宿の住所
    inn_address = document.getElementById( "inn_address" ).value;

    inn_address = inn_address.split(/[(',)\s]/);

    inn_address = inn_address.filter(Boolean);


    //宿の名前
    inn_name = document.getElementById( "inn_name" ).value;

    inn_name = inn_name.split(/[(',)\s]/);

    inn_name = inn_name.filter(Boolean);


    //宿の電話番号
    inn_phone_number = document.getElementById( "inn_phone_number" ).value;

    inn_phone_number = inn_phone_number.split(/[(',)\s]/);

    inn_phone_number = inn_phone_number.filter(Boolean);


    //宿の情報
    inn_information = document.getElementById( "inn_information" ).value;

    inn_information = inn_information.split(/[(',)\s]/);

    inn_information = inn_information.filter(Boolean);


    for (let i = 0; i < inn_address.length; i++) {//ピンを多数立てるためにリストの数だけ回す
        geocoder.geocode({
            "address" : inn_address[i]
        }, function(results, status) { // 結果
            if (status === google.maps.GeocoderStatus.OK) { // ステータスがOKの場合
                let bounds = new google.maps.LatLngBounds();
                latlng = results[0].geometry.location;
                bounds.extend(latlng);

                //マーカーを立てる
                inn_marker[i] = new google.maps.Marker({
                    position: latlng,
                    map: map
                });

                //吹き出し
                inn_information_html[i] = "<div class='information'>" + inn_name[i] + "<br>電話番号:"+ inn_phone_number[i] + "<br>" + inn_information[i] + "</div>";//informationをhtmlに変換
                inn_infoWindow[i] = new google.maps.InfoWindow({
                    content: inn_information_html[i] // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
                });

                //マーカーをクリックしたとき吹き出しを表示
                inn_marker[i].addListener('click', function() {
                    inn_infoWindow[i].open(map, inn_marker[i]);
                });
    //-------------------------------------------------------------------------
            } else { // 失敗した場合
                console.group('Error');
                console.log(results);
                console.log(status);
            }
        });
    }

    //コンビニのピン--------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //コンビニの住所
    convenience_address = document.getElementById( "convenience_address" ).value;

    convenience_address = convenience_address.split(/[(',)\s]/);

    convenience_address = convenience_address.filter(Boolean);
    //console.log("convenience_address:" + convenience_address);


    //コンビニの名前
    convenience_name = document.getElementById( "convenience_name" ).value;

    convenience_name = convenience_name.split(/[(',)\s]/);

    convenience_name = convenience_name.filter(Boolean);


    //コンビニの電話番号
    // convenience_phone_number = document.getElementById( "convenience_phone_number" ).value;

    // convenience_phone_number = convenience_phone_number.split(/[(',)\s]/);

    // convenience_phone_number = convenience_phone_number.filter(Boolean);


    //コンビニの情報
    convenience_information = document.getElementById( "convenience_information" ).value;

    convenience_information = convenience_information.split(/[(',)\s]/);

    convenience_information = convenience_information.filter(Boolean);


    for (let i = 0; i < convenience_address.length; i++) {//ピンを多数立てるためにリストの数だけ回す
        geocoder.geocode({
            "address" : convenience_address[i]
        }, function(results, status) { // 結果
            console.log("convenience_address:" + convenience_address[i]);
            console.log("google.maps.GeocoderStatus");
            console.log(status === google.maps.GeocoderStatus.OK);
            console.log("before");
            //console.log("convenience_address:" + convenience_address[i]);
            if (status === google.maps.GeocoderStatus.OK) { // ステータスがOKの場合
                //console.log("OK");
                let bounds = new google.maps.LatLngBounds();
                latlng = results[0].geometry.location;
                bounds.extend(latlng);

                //マーカーを立てる
                convenience_marker[i] = new google.maps.Marker({
                    position: latlng,
                    map: map
                });

                //吹き出し
                convenience_information_html[i] = "<div class='information'>" + convenience_name[i] + "<br>" + convenience_information[i] + "</div>";//informationをhtmlに変換
                convenience_infoWindow[i] = new google.maps.InfoWindow({
                    content: convenience_information_html[i] // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
                });

                //マーカーをクリックしたとき吹き出しを表示
                convenience_marker[i].addListener('click', function() {
                    convenience_infoWindow[i].open(map, convenience_marker[i]);
                });
    //-------------------------------------------------------------------------
            } else { // 失敗した場合
                console.group('Error');
                console.log(results);
                console.log(status);
            }
        });
    }

    //面白のピン--------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //面白の住所
    interesting_address = document.getElementById( "interesting_address" ).value;

    interesting_address = interesting_address.split(/[(',)\s]/);

    interesting_address = interesting_address.filter(Boolean);
    console.log("interesting_address:" + interesting_address);


    //面白の名前
    interesting_name = document.getElementById( "interesting_name" ).value;

    interesting_name = interesting_name.split(/[(',)\s]/);

    interesting_name = interesting_name.filter(Boolean);
    //console.log("interesting_name:" + interesting_name);
    console.log("interesting_name:" + interesting_name);

    //面白の情報
    interesting_information = document.getElementById( "interesting_information" ).value;

    interesting_information = interesting_information.split(/[(',)\s]/);

    interesting_information = interesting_information.filter(Boolean);
    console.log("interesting_information:" + interesting_information);

    for (let i = 0; i < interesting_address.length; i++) {//ピンを多数立てるためにリストの数だけ回す
        geocoder.geocode({
            "address" : interesting_address[i]
        }, function(results, status) { // 結果
            console.log("interesting_address:" + interesting_address[i]);
            console.log("google.maps.GeocoderStatus");
            console.log(status === google.maps.GeocoderStatus.OK);
            console.log("before");
            if (status === google.maps.GeocoderStatus.OK) { // ステータスがOKの場合
                console.log("after");
                let bounds = new google.maps.LatLngBounds();
                latlng = results[0].geometry.location;
                bounds.extend(latlng);

                // //ここまでしなくていい？
                // for (let i in results) {
                //     if (results[i].geometry) {
                //         // 緯度経度を取得
                //         latlng = results[i].geometry.location;
                //         // 検索結果地が含まれるように範囲を拡大
                //         bounds.extend(latlng);
                //     }
                // }
                console.log(latlng);

                //マーカーを立てる
                interesting_marker[i] = new google.maps.Marker({
                    position: latlng,
                    map: map
                });
                console.log("interesting_address:" + interesting_address);
                console.log("latlng:" + latlng);

                //吹き出し
                interesting_information_html[i] = "<div class='information'>" + interesting_name[i] + "<br>" + interesting_information[i] + "</div>";//informationをhtmlに変換
                interesting_infoWindow[i] = new google.maps.InfoWindow({
                    content: interesting_information_html[i] // 吹き出しに表示する内容 改行したいときはdb内で<br>を記述
                });

                //マーカーをクリックしたとき吹き出しを表示
                interesting_marker[i].addListener('click', function() {
                    interesting_infoWindow[i].open(map, interesting_marker[i]);
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