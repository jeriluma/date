// document ready function
$(function(){
    hideTemplateDesc();
    calendar();
    highlight();
    checkWindow();
    $(window).resize(function() {
        checkWindow();
    });
    
    $("#title").click(function() {
        location.reload();
    });

    $(".search-options-button-less").hide();

    $(".search-options-button-more").click(function() {
        $(".search-options-button-more").hide();
        $(".search-options-button-less").show();
        $(".search-options").fadeIn(1000);
    });

    $(".search-options-button-less").click(function() {
        $(".search-options-button-more").show();
        $(".search-options-button-less").hide();
        $(".search-options").hide();
    });

    $("input[type=text").focus(function() {
        input = this;
        var placeholder = $(this).attr("placeholder");
        $(this).removeAttr("placeholder");

        $(this).focusout(function() {
            $(this).attr("placeholder", placeholder);
        });
    });

    // formatDay();

    timeIni();

    $(".line").click(function() {
        $("#search-form").toggle();
        $(".line-message").toggle();
    });
    
});

function timeIni() {
    $(".startHour").keyup(function() {
        numbersOnly(this);
        checkTime(this, "hour"); 
        timeLable();       
    });

    $(".startMin").keyup(function(){
        numbersOnly(this);
        checkTime(this, "minute");         
        timeLable();
    });

    $(".endHour").keyup(function() {
        numbersOnly(this);
        checkTime(this, "hour");        
        timeLable();
    });

    $(".endMin").keyup(function(){
        numbersOnly(this);
        checkTime(this, "minute");         
        timeLable();
    });

    $(".startAMPM").click(timeLable());
    $(".endAMPM").click(timeLable());
}

function timeLable() {
    $(".search-time").hide();
    if($(".time-message").html() == "" ) {
        $(".search-start-time").html($(".startHour").val() + ":" + $(".startMin").val() + " " + $(".startAMPM-highlight").html());
        $(".search-end-time").html($(".endHour").val() + ":" + $(".endMin").val() + " " + $(".endAMPM-highlight").html());
        $(".search-time").show();
    }
}

// hides template and hover over descriptions
function hideTemplateDesc() {
    $(".template").hide();
    $(".col-time div").hide();
    $(".col-event div").hide();
    $(".col-eat div").hide();
    $(".mini-calendar-small").hide();
    $(".mini-calendar-big").hide();
    $("#search-form").hide();
}

// Handles the highlighting of elements in times, events, and eats
function highlight() {
    $(".col-location").click(function() {
        $(this).toggleClass("col-location-highlight");
    });

    $(".col-time").click(function() {
        $(this).toggleClass("col-time-highlight");
    });

    $(".col-event").click(function() {
        $(this).toggleClass("col-eat-highlight");
    });

    $(".col-eat").click(function() {
        $(this).toggleClass("col-eat-highlight");
    });

    $(".startAMPM").click(function() {
        $(".startAMPM").removeClass("startAMPM-highlight");
        $(this).toggleClass("startAMPM-highlight");
    });

    $(".endAMPM").click(function() {
        $(".endAMPM").removeClass("endAMPM-highlight");
        $(this).toggleClass("endAMPM-highlight");
    });
}

// Handles the descriptions in times, events and eats
function checkWindow() {
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

        $(".mini-calendar-day").click(function() {
            $(".mini-calendar-big").toggle();
        });

        $(".search-details-options").show();


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

        $(".mini-calendar-day").click(function() {
            $(".mini-calendar-small").toggle();
        });

        $(".search-details-options").hide();
    }
}

function calendar() {
    var currentView = new Date();
    populateCalendar(currentView);

    $(".calendar-month-before").click(function() {
        currentView.setDate(1);
        currentView.setMonth(currentView.getMonth() - 1);
        
        if (currentView.getMonth() < 0) {
            currentView.setMonth(12);
            currentView.setUTCFullYear(getUTCFullYear() - 1);
        }
        populateCalendar(currentView);  
    });

    $(".calendar-month-after").click(function() {
        currentView.setDate(1);
        currentView.setMonth(currentView.getMonth() + 1);
        
        if (currentView.getMonth() > 11) {
            currentView.setMonth(1);
            currentView.setUTCFullYear(getUTCFullYear() + 1);
        }
        populateCalendar(currentView);  
    });

    var day = $(".col-day-highlight span").html();
    var month = $(".calendar-month").html();
    $(".search-date").html(day + " " + month);
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

    $(".calendar-month").html(month[d.getMonth()] + 
        " " + d.getUTCFullYear());

    var container = $(".day-container");
    var template = $(".col-day-template");
    var templateClone;
    container.empty();

    for(var i = 1; i <= d.getDay(); i++) {
        templateClone = template.clone();
        templateClone.html("");
        templateClone.removeClass("col-day-template");
        templateClone.addClass("col-day-empty");
        templateClone.show();
        container.append(templateClone);
    }

    for(var i = d.getDate(); i <= day[d.getMonth()]; i++) {
        templateClone = template.clone();
        templateClone.find("span").html(i);
        if (today(d, i)) {
            templateClone.addClass("col-day-today");
            templateClone.find("div").addClass("col-day-highlight");
        }
            
        templateClone.removeClass("col-day-template");
        templateClone.show();
        container.append(templateClone);
    }

    $(".col-day").click(function() {
        $(".col-day").removeClass("col-day-highlight");
        $(this).addClass("col-day-highlight");
        $(".mini-calendar-day").html((d.getMonth() + 1) + "." 
            + $(this).find("span").html() + "."
            + d.getUTCFullYear());

        var day = $(".col-day-highlight span").html();
        var month = $(".calendar-month").html();
        $(".search-date").html(day + " " + month);
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

function formatDay() {
    var d = new Date();
    var hour = d.getHours();
    hour = hour.parseInt();
    var t = "";
    var am = false;

    if (hour < 12) {
        if(hour == 00)
            t += "12";    
        else if(hour < 10)
            t += hour % 10;
        else
            t += hour;
        am = true;
    } else {
        if (hour == 12)
            t += hour;
        else
            t += hour - 12; 
    }
 
    $(".startHour").val(t);
}

function checkTime(t, type) {
    $(".time-message").hide();
    var time = $(t).val();
    var isnum = /^\d+$/.test(time);
    time = parseInt(time);


    if(type == "hour") {
        if (time < 0 || time > 12) {
            $(".time-message").html("Invalid hour input");
            $(".time-message").fadeIn(500);
        } else {
            $(".time-message").fadeOut(500);
            $(".time-message").html("");
        }
    } else {
        if (time < 0 || time > 59) {
            $(".time-message").html("Invalid minute input");
            $(".time-message").fadeIn(500);
        } else {
            $(".time-message").fadeOut(500);
            $(".time-message").html("");
        }
    }
}

function numbersOnly(t) {
    var time = $(t).val();
    var isnum = /^\d+$/.test(time);
    if(isnum == false) {
        $(t).val("");       
    }
}
