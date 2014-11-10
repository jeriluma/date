// document ready function
$(function(){
	$(".plan-my-date").click(function() {
		getEventsEats();
	});

    // getEventsEats();
    $(".results-container").hide();
    $(".search-title").hide();
    $(".search-navi").hide();
    $(".search-options").hide();

    // getEventsEats();
});

function getEventsEats() {
    $("#search").fadeOut(1000);
    $("#search-form").fadeOut(1000);
    $(".search-options-button").fadeOut(1000);
    $(".search-options").fadeOut(1000);

    getEvents();
    // getEats();
}

function getEvents(dateLocation) {
    $.ajax({
        type: "post",
        url: "http://api.eventful.com/json/events/search",
        data: {
            app_key: "K7b4cBjVXBTFm2wW",
            // keywords: "",
            location: "seattle",
            date: "Future",
            // category: "",
            page_size: "10"
            
        },
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (data) {
            formatEvents(data["events"]["event"]);
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

function formatEvents(data) {
    var container = $(".results-container");
    var template = $(".results-template");
    var templateClone;

    container.empty()

    for(var i = 0; i < data.length; i++) {
        var result = data[i];
        
        templateClone = template.clone();
        templateClone.find(".result-event-reservation").html(result["title"]);
        templateClone.find(".result-event-reservation").attr('href', result["url"]);
        templateClone.find(".result-event-venue").html(result["venue_name"]);
        templateClone.find(".result-event-address").html(formatAddress(result));
        
        templateClone.find(".result-event-day").html(formatDay(result));
        templateClone.find(".result-event-time").html(formatTime(result));
        
        // templateClone.find(".result-event-description").html(result["description"]);

        templateClone.removeClass("results-template");
        templateClone.show();
        container.append(templateClone);
    }

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

function getEats() {
    $.ajax({
        type: "post",
        url: "js/googleplaces.php",
        success: function (data) {
            // console.log("places: " + JSON.stringify(data['results')]);
        },
        error: function (xhr, status, error) {
            // $(".loader").hide();
            console.log(error);
        }
    });
}


