var interval = setInterval(clock, 1000);

function clock() {
    var today = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var dag = weekday[today.getDay()];
    var date = dag + " " + today.getDate() + " " + '/' + " " + (today.getMonth() + 1) + " " + '/' + " " + today.getFullYear();
    var timezone = getTimezoneName(today); //see function below
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);

    document.getElementById("clock").innerHTML = h + ":" + m + ":" + s;
    document.getElementById("timezonetext").innerHTML = timezone;
    document.getElementById("datumtext").innerHTML = date;

    if (h >= 18 && h < 24)
        document.getElementById("body").className = "dusk";
    else if (h >= 0 && h < 6)
        document.getElementById("body").className = "night";
    else if (h >= 6 && h < 12)
        document.getElementById("body").className = "dawn";
    else
        document.getElementById("body").className = "noon";

    interval;
}

// add zero in front of numbers < 10
function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    };
    return i;
}


// convert getTimezoneoffset to readable timezone names, copied from https://stackoverflow.com/questions/9772955/how-can-i-get-the-timezone-name-in-javascript
function getTimezoneName(today) {
    const short = today.toLocaleDateString(undefined);
    const full = today.toLocaleDateString(undefined, {
        timeZoneName: 'long'
    });

    // Trying to remove date from the string in a locale-agnostic way
    const shortIndex = full.indexOf(short);
    if (shortIndex >= 0) {
        const trimmed = full.substring(0, shortIndex) + full.substring(shortIndex + short.length);

        // by this time `trimmed` should be the timezone's name with some punctuation -
        // trim it from both sides
        return trimmed.replace(/^[\s,.\-:;]+|[\s,.\-:;]+$/g, '');

    } else {
        // in some magic case when short representation of date is not present in the long one, just return the long one as a fallback, since it should contain the timezone's name
        return full;
    }
}

function stop() {
    clearInterval(interval);
}

//demo buttons to show background animation
document.getElementById('dusk').onclick = function () {
    document.getElementById("body").className = "dusk";
    stop();

}
document.getElementById('dawn').onclick = function () {
    document.getElementById("body").className = "dawn";
    stop();
}
document.getElementById('noon').onclick = function () {
    document.getElementById("body").className = "noon";
    stop();
}
document.getElementById('night').onclick = function () {
    document.getElementById("body").className = "night";
    stop();
}