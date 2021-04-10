/**to do list:
- ADD JS to make the font of the banner title dymanic to the lenth of the name 

*/




$(document).ready(function() {

    var showC1 = { 'grid-template-columns': '100% 0% 0%' };
    var showC2 = { 'grid-template-columns': '0% 100% 0%' };
    var showC3 = { 'grid-template-columns': '0% 0% 100%' };

    $("#tab1").mouseenter(function() {
        $('#tab1').css({

            'color': 'white'
        });
    });
    $('#tab1').mouseleave(function() {
        $('#tab1').css({
            'color': 'black'
        });
    });
    $("#tab2").mouseenter(function() {
        $('#tab2').css({
            'color': 'white'
        });
    });
    $('#tab2').mouseleave(function() {
        $('#tab2').css({
            'color': 'black'
        });
    });
    $("#tab3").mouseenter(function() {
        $('#tab3').css({
            'color': 'white'
        });
    });
    $('#tab3').mouseleave(function() {
        $('#tab3').css({
            'color': 'black'
        });
    });

    $("#tab1").click(function() {
        $("#content").css(showC1);
        $("#content2").css('visibility', 'hidden');
        $("#content3").css('visibility', 'hidden');
        $("#content1").css('visibility', 'visible');
    });
    $("#tab2").click(function() {
        $("#content").css(showC2);
        $("#content1").css('visibility', 'hidden');
        $("#content3").css('visibility', 'hidden');
        $("#content2").css('visibility', 'visible');
    });
    $("#tab3").click(function() {
        $("#content").css(showC3);
        $("#content2").css('visibility', 'hidden');
        $("#content1").css('visibility', 'hidden');
        $("#content3").css('visibility', 'visible');
    });


});

const parsedUrl = new URL(window.location.href);
console.log(parsedUrl.searchParams.get("id")); // "123"

// extract id from url, assign to variable
var id = parsedUrl.searchParams.get("id");
console.log(id);