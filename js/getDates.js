// document ready function
$(function(){

	$("#pmd-1").click(function() {
		getEventsEats();
	});

    $("#pmd-2").click(function() {
        getEventsEatsForm();
    });

    $("input[type=text").keypress(function(event) {
        if ( event.which == 13 ) getEventsEats();
    });

    $("input[type=text").keyup(function(){
        // getQuerySuggestions($(this).val(), $(this).attr("name") + "-suggestion-container");
    });

    $(".results-container").hide();
    $(".search-title").hide();
    $(".search-options").hide();
    $(".search-details").hide();

    $("input[type=text]").focusout(function() {
        $("#location-suggestion-container").empty();
        $("#eat-suggestion-container").empty();
        $("#evet-suggestion-container").empty();
    });
});

function getQuerySuggestions(query, container) {
    $.ajax({
        type: "post",
        url: "http://suggestqueries.google.com/complete/search",
        data: {
            client: "firefox",
            q: query
        },
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (data) {
            formatQuerySuggestions(data[1], $("#" + container));
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

function formatQuerySuggestions(data, container) {
    container.empty();

    var template = $(".query-suggestion-template");
    var templateClone;

    var entries = data.length
    if(entries > 5)
        entries = 5;

    for(var i = 0; i < entries; i++) {
        var result = data[i];
        templateClone = template.clone();

        templateClone.html(result);
        templateClone.removeClass("query-suggestion-template");
        templateClone.show();
        container.append(templateClone);
    }
}

function getEventsEatsForm() {
    var location = $("#search-form .col-location-highlight");
    var city = location.find(".col-location-city").html(); 
    var state = location.find(".col-location-state").html();
    location = city + ", " + state;
    $("input[name=location").val(location);

    var time = $(".col-time-highlight .col-real-time").html().split(";");
    var start = time[0].split(":");
    var end = time[1].split(":");
    $("input[name=startHour]").val(start[0]);
    $("input[name=startMin]").val(start[1]);
    $("input[name=endHour]").val(end[0]);
    $("input[name=endMin]").val(end[1]);
    $(".startAMPM").removeClass("startAMPM-highlight");
    $(".endAMPM").removeClass("endAMPM-highlight");
    if(start[2] == "AM") {
        $(".startAM").addClass("startAMPM-highlight");
    } else {
        $(".startPM").addClass("startAMPM-highlight");
    }
    if(end[2] == "AM") {
        $(".endAM").addClass("endAMPM-highlight");
    } else {
        $(".endPM").addClass("endAMPM-highlight");
    }

    var e = $("#search-form .col-event-highlight").find(".event-title").html();
    $("input[name=event").val(e);

    var eat = $("#search-form .col-eat-highlight").find(".eats-title").html();
    $("input[name=eat]").val(eat);

    timeIni();
    getEventsEats();
}

function getEventsEats() {
    $("#search-form").fadeOut(1000);
    $(".select-form").fadeOut(1000);

    $(".search-options-button-more").show();
    $(".search-options-button-less").hide();
    $(".search-options").fadeOut(1000);

    $('html, body').animate({scrollTop:0}, 'slow');

    var location = $("input[name=location]").val();
    location = location.trim();
    if(location == "") {
        location = "Seattle";
    }

    var eat = $("input[name=eat]").val();
    var events = $("input[name=event").val();
    var t = getTime().split(";");
    var startTime = getDate() + " " + getTime("start");
    var endTime = getDate() + " " + getTime("end");
    var query = location + " " + eat + " " + events + " " + startTime + " " + endTime;

    getEats(location, eat, events, startTime, endTime);
}

function getDate() {
    var month = new Array();
    month["January"] = 1;
    month["February"] = 2;
    month["March"] = 3;
    month["April"] = 4;
    month["May"] = 5;
    month["June"] = 6;
    month["July"] = 7;
    month["August"] = 8;
    month["September"] = 9;
    month["October"] = 10;
    month["November"] = 11;
    month["December"] = 12;

    var d = $(".calendar-month").html().split(" ");
    return d[1] + "-" + month[d[0]] + "-" + $(".col-day-highlight span").html();
}

function getTime(status) {
    // "2005-03-01 19:00:00"
    var date = "";
    if($(".time-message").html() == "") { // valid input
        if(status == "start") {
            var startHour = $("input[name=startHour]").val();
            var startMin = $("input[name=startMin]").val();
            var startAMPM = " " + $(".startAMPM-highlight").html();
            date = checkHour(parseInt(startHour), startAMPM.trim()) + ":" + startMin + ":00"    
        } else { // end
            var endHour = $("input[name=endHour]").val();
            var endMin = $("input[name=endMin]").val();
            var endAMPM = " " + $(".endAMPM-highlight").html();
            date = checkHour(parseInt(endHour), endAMPM.trim()) + ":" + endMin + ":00";
        }
    } 
    return date;
}

function checkHour(hour, AMPM) {
    if (AMPM == "PM" && hour != 12) {
        hour += 12;
    } 
    return hour;
}

function getEats(location, eat, events, startTime, endTime) {
    $.get(
        "js/googleplaces.php", 
        {q: eat + ";" + location}, 
        function(data){
            if (data != undefined ) {
                formatEats(data["status"], data["results"], location, events, startTime, endTime);
            } else {
                $(".results-container").html("No results found.");
            }
        }
    );
}

function formatEats(status, data, events, startTime, endTime) {
    if (status == "ZERO_RESULTS") {
        $(".results-container").html("No results found.");
    } else {
        var container = $(".results-container");
        var template = $(".results-template");
        var templateClone;

        container.empty();

        var entries = data.length;
        if(entries > 10)
            entries = 10;

        for(var i = 0; i < entries; i++) {
            var result = data[i];
            templateClone = template.clone();

            templateClone.find(".result-eat-title").html(result["name"]);
            templateClone.find(".result-eat-address").html(result["formatted_address"]);

            var location = result["formatted_address"];
            getEvents(container, templateClone, location, events, startTime, endTime);  
        }

    }  
}

function getEvents(container, templateClone, location, events, startTime, endTime) {
    $.ajax({
        type: "post",
        url: "http://api.eventful.com/json/events/search",
        data: {
            app_key: "K7b4cBjVXBTFm2wW",
            keywords: events,
            location: location,
            date: "Future",
            // page_size: "2",
            start_time: startTime,
            end_time: endTime
        },
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (data) {
            formatEvents(container, templateClone, data["events"]["event"]);
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

function formatEvents(container, templateClone, data) {
    var i = Math.floor(Math.random() * data.length);
    var result = data[i];
    templateClone.find(".result-event-reservation").html(result["title"]);
    templateClone.find(".result-event-reservation").attr('href', result["url"]);
    templateClone.find(".result-event-venue").html(result["venue_name"]);
    templateClone.find(".result-event-address").html(formatAddress(result));
    templateClone.find(".result-event-day").html(formatDay(result));
    templateClone.find(".result-event-time").html(formatTime(result));
    templateClone.removeClass("results-template");
    templateClone.show();
    container.append(templateClone);

    $(".search-title").fadeIn(1000);
    $(".search-navi").fadeIn(1000);
    container.fadeIn(1000);
}


function formatAddress(result) {
    var address = "";
    if (result["venue_address"] != null) {
        address += result["venue_address"] + " ";
    }
    if(result["city_name"] != null) {
        address += result["city_name"] + " ";
    }
    if(result["region_abbr"] != null) {
        address += result["region_abbr"] + " ";
    }
    if(result["postal_code"] != null) {
        address += result["postal_code"];
    }
    return address;
}

function formatDay (result) {
    var start_time = result["start_time"];
    start_time = start_time.split(" ");
    var day = start_time[0].split("-");
    var d = day[1] + "." + day[2] + "." + day[0]
    return d;
}

function formatTime (result) {
    var start_time = result["start_time"];
    start_time = start_time.split(" ");
    var time = start_time[1].split(":");
    var t = "";

    var hour = time[0];
    var minute = time[1];

    if (hour < 12) {
        if(hour == 00)
            t += "12";    
        else if(hour < 10)
            t += hour % 10;
        else
            t += hour;
        t += ":" + minute;
        t += " am";
    } else {
        if (hour == 12)
            t += hour;
        else
            t += time[0] - 12;    
        t += ":" + minute;
        t += " pm";
    }
    return t;
}
