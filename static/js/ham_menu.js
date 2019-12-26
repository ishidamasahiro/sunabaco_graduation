/*ham.addEventListener('click', function() {
	ham.classList.toggle('clicked');
});


const ham = document.getElementById('ham');
const ham_menu_wrapper = document.getElementById('ham_menu_wrapper');
ham.addEventListener('click', function() {
	ham.classList.toggle('clicked');
	ham_menu_wrapper.classList.toggle('clicked');
});*/

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
});