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


}

function formatEvents() {

}

function formatEats() {

}
