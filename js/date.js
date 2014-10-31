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

    // $(".loader").show();

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
        type: "post",
        url: "js/googleplaces.php",
        success: function (data) {
            $("#date-container").html(JSON.stringify(data['results']));
        },
        error: function (xhr, status, error) {
            // $(".loader").hide();
            // alert("error");
        }
    });
}

function formatEvents() {

}

function formatEats() {

}
