yarn.service("statusFormats", function () {

    function timeOfDay(value) {
        var d = new Date(1976, 01, 01, 0, value, 0, 0);
        var minutesStr = "00" + d.getMinutes();
        return d.getHours() + ":" + (minutesStr).substr(minutesStr.length-2, 2);
    }

    return {
        timeOfDay: timeOfDay
    }

});

