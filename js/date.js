// document ready function
$(function(){
	$(".template").hide();

	$("#plan-my-date").submit(function() {
		var dateLocation = $("input[name=location]").val();
		var dateEvent = $("input[name=event]").val();
		var dateEat = $("input[name=eat]").val();

		alert(dateLocation + " " + dateEvent + " " +dateEat);
	});
});