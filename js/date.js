// document ready function
$(function(){
	$(".template").hide();
    $(".col-time div").hide();
    $(".col-event div").hide();
    $(".col-eat div").hide();

    $(".col-location").click(function() {
        $(this).toggleClass("col-location-highlight");
    });

    $(".col-time").click(function() {
        $(this).toggleClass("col-time-highlight");
    });

    calendar();

    $(".col-event").click(function() {
        $(this).toggleClass("col-eat-highlight");
    });

    $(".col-eat").click(function() {
        $(this).toggleClass("col-eat-highlight");
    });

    $(window).resize(function() {
        if (window.matchMedia('(min-width: 768px)').matches) {
            $(".col-time").mouseover(function() {
                 $(this).find("div").show();
            });

            $(".col-time").mouseout(function() {
                 $(this).find("div").hide();
            });

            $(".col-event").mouseover(function() {
                $(this).find("div").show();
            });

            $(".col-event").mouseout(function() {
                $(this).find("div").hide();
            });

            $(".col-eat").mouseover(function() {
                 $(this).find("div").show();
            });

            $(".col-eat").mouseout(function() {
                 $(this).find("div").hide();
            });
        } else {
            $(".col-time").mouseover(function() {
                 $(this).find("div").hide();
            });

            $(".col-event").mouseover(function() {
                $(this).find("div").hide();
            });

            $(".col-eat").mouseover(function() {
                 $(this).find("div").hide();
            });
        }
    });

    // searches when typing
    // $("input[type=search]").keyup(function() {
    //  getEventsEats();
    // });

	$("#plan-my-date").submit(function() {
		getEventsEats();
		return false; // keeps on same page
	});
});

function calendar() {
    var currentView = new Date();
    populateCalendar(currentView);

    $("#calendar-month-before").click(function() {
        currentView.setDate(1);
        currentView.setMonth(currentView.getMonth() - 1);
        
        if (currentView.getMonth() < 0) {
            currentView.setMonth(12);
            currentView.setUTCFullYear(getUTCFullYear() - 1);
        }
        populateCalendar(currentView);  
    });

    $("#calendar-month-after").click(function() {
        currentView.setDate(1);
        currentView.setMonth(currentView.getMonth() + 1);
        
        if (currentView.getMonth() > 11) {
            currentView.setMonth(1);
            currentView.setUTCFullYear(getUTCFullYear() + 1);
        }
        populateCalendar(currentView);  
    });
}

function populateCalendar(d) {
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    var day = new Array();
    day[0] = 31;
    day[1] = 28;
    day[2] = 31;
    day[3] = 30;
    day[4] = 31;
    day[5] = 30;
    day[6] = 31;
    day[7] = 31;
    day[8] = 30;
    day[9] = 31;
    day[10] = 30;
    day[11] = 31;

    if(d.getUTCFullYear() % 4 == 0 && 
        (d.getUTCFullYear() % 100 != 0 || d.d.getUTCFullYear() % 400 == 0)) {
        day[1] = 29;
    }

    $("#calendar-month").html(month[d.getMonth()] + 
        " " + d.getUTCFullYear());

    var container = $(".day-container");
    var template = $(".col-day-template");
    var templateClone;
    container.empty();

    for(var i = 1; i <= d.getDay(); i++) {
        templateClone = template.clone();
        templateClone.html("");
        templateClone.removeClass("col-day-template");
        // templateClone.removeClass("col-day");
        // templateClone.addClass("col-day-width");
        templateClone.addClass("col-day-empty");
        templateClone.show();
        container.append(templateClone);
    }

    for(var i = d.getDate(); i <= day[d.getMonth()]; i++) {
        templateClone = template.clone();
        templateClone.find("span").html(i);
        if (today(d, i))
            templateClone.addClass("col-day-today");
        templateClone.removeClass("col-day-template");
        templateClone.show();
        container.append(templateClone);
    }

    $(".col-day").click(function() {
        $(this).toggleClass("col-day-highlight");
        console.log(d.getMonth() + 1 
            + $(this).find("span").html() 
            + d.getUTCFullYear());
    });
}

function today(d, i) {
    var t = new Date();
    var year = d.getUTCFullYear() == t.getUTCFullYear();
    var month = d.getMonth() == t.getMonth();
    var day = i == t.getDate();
    if (year && month && day)
        return true;
    return false;
}

function getEventsEats() {
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


