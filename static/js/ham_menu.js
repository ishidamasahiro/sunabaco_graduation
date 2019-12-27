/*ham.addEventListener('click', function() {
	ham.classList.toggle('clicked');
});


const ham = document.getElementById('ham');
const ham_menu_wrapper = document.getElementById('ham_menu_wrapper');
ham.addEventListener('click', function() {
	ham.classList.toggle('clicked');
	ham_menu_wrapper.classList.toggle('clicked');
});*/
/*
$(function() {
    $("#navi-btn").click(function(){
        if (!$("#navi-btn").hasClass("navi-btn-on")) {
            $("#navi-btn").addClass("navi-btn-on");
            $("#navi-btn p").text("閉じる");
            $("#navi-menu").fadeIn();
        } else {
            $("#navi-btn").removeClass("navi-btn-on")
            $("#navi-btn p").text("メニュー");
            $("#navi-menu").fadeOut();
    }
    });
});*/

/*
$(function() {
　$('.Toggle').click(function() {
　　$(this).toggleClass('active');

　if ($(this).hasClass('active')) {
　　$('.NavMenu').addClass('active');　 //クラスを付与
　} else {
　　$('.NavMenu').removeClass('active'); //クラスを外す
　}
　});
});*/


//変数定義
var navigationOpenFlag = false;
var navButtonFlag = true;
var focusFlag = false;

//ハンバーガーメニュー
$(function(){

    $(document).on('click','.el_humburger',function(){
        if(navButtonFlag){
            spNavInOut.switch();
          //一時的にボタンを押せなくする
            setTimeout(function(){
            navButtonFlag = true;
        },200);
        navButtonFlag = false;
        }
    });
    $(document).on('click touchend', function(event) {
        if (!$(event.target).closest('.el_humburger').length && $('.header').hasClass('js_humburgerOpen') && focusFlag) {
            focusFlag = false;
          //scrollBlocker(false);
            spNavInOut.switch();
        }
    });
    });

//ナビ開く処理
function spNavIn(){
    $('header').removeClass('js_humburgerClose');
    $('header').addClass('js_humburgerOpen');
    setTimeout(function(){
        focusFlag = true;
    },200);
    setTimeout(function(){
        navigationOpenFlag = true;
    },200);
}

//ナビ開閉コントロール
var spNavInOut = {
    switch:function(){
        if($('header.spNavFreez').length){
            return false;
        }
        if($('header').hasClass('js_humburgerOpen')){
            spNavOut();
        } else {
            spNavIn();
        }
    }
};

//ナビ閉じる処理
function spNavOut(){
    $('header').removeClass('js_humburgerOpen');
    $('header').addClass('js_humburgerClose');
    setTimeout(function(){
        $(".uq_spNavi").removeClass("js_appear");
        focusFlag = false;
    },200);
    navigationOpenFlag = false;
}

