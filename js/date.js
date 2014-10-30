// document ready function
$(function(){
	$(".template").hide();

	// $("input[type=search]").keyup(function() {
	// 	getDates();
	// });

	$("#plan-my-date").submit(function() {
		getDates();
		return false; // keeps on same page
	});
});

function getDates() {
	var dateLocation = $("input[name=location]").val();
	var dateEvent = $("input[name=event]").val();
	var dateEat = $("input[name=eat]").val();

	// alert(dateLocation + ", " + dateEvent + ", " +dateEat);

	// getEvents();
	getEats();
}

function getEvents(dateLocation) {
	$.ajax({
        type: "post",
        url: "http://api.eventful.com/json/events/search",
        data: {
        	app_key: "K7b4cBjVXBTFm2wW",
        	location: "seattle"
        },
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (data) {
        	// $(".loader").hide();
        	// alert("success");
        	formatEvents();
        },
        error: function (xhr, status, error) {
            // $(".loader").hide();
            // alert("error");
        }
    });
}

function getEats() {
	$.ajax({
        type: "get",
        url: "http://api.yelp.com/v2/search",
        data: {
        	oauth_consumer_key: "sTOUSubEaIhpr1j9dvfsjQ",
        	oauth_token: "s0dgcSrQLI3jH1_nLygF11r-L0mmiLod",
        	oauth_signature_method: "hmac-sha1",
        	oauth_signature: "wBQhbIhomIZqmJYwMTcRlH3A7wA",
        	oauth_timestamp: new Date().getSeconds(),
        	oauth_nonce: makeid()
        },
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (data) {
        	// $(".loader").hide();
        	// alert("success");
        	formatEvents();
        },
        error: function (xhr, status, error) {
            // $(".loader").hide();
            // alert("error");
        }
    });
}

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


function formatEvents() {

}
