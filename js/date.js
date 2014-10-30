// document ready function
$(function(){
	$(".template").hide();

    // searches when typing
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

    // clean up / validate input data

	// getEvents();
	getEats();
}

function getEvents(dateLocation) {
    // $(".loader").show();

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
    var Consumer_Key = "sTOUSubEaIhpr1j9dvfsjQ";
    var Consumer_Secret = "wBQhbIhomIZqmJYwMTcRlH3A7wA";
    var Token = "s0dgcSrQLI3jH1_nLygF11r-L0mmiLod";
    var Token_Secret = "iDCdK6XXxwLQ0_CWVn_pD1xknZk";

	$.ajax({
        type: "post",
        url: "http://api.yelp.com/v2/search?_=" + Math.round((new Date()).getTime() / 1000),
        data: {
            oauth_consumer_key: 
        	oauth_consumer_key: Consumer_Key,
            oauth_nonce: makeid(),
        	oauth_signature_method: "HMAC-SHA1",
        	oauth_signature: Consumer_Secret + "%26" + Token_Secret,
        	oauth_timestamp: Math.round((new Date()).getTime() / 1000),
        	oauth_token: Token,

            term: "food"
        },
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (data) {
        	// $(".loader").hide();
        	// alert("success");
        	formatEats();
        },
        error: function (xhr, status, error) {
            // $(".loader").hide();
            // alert("error");
        }
    });
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


function formatEvents() {

}

function formatEats() {

}
