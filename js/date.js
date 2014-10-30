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

	getEvents();
}

function getEvents(dateLocation) {
	$.ajax({
        type: "POST",
        url: "http://api.eventful.com/json/events/search",
        data: {app_key: "K7b4cBjVXBTFm2wW", location: "seattle"},
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (data) {
        	// $(".loader").hide();
        	// alert("success");
        },
        error: function (xhr, status, error) {
            // $(".loader").hide();
            // alert("error");
        }
    });
}

function formatEvents(data) {

}
