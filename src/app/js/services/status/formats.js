yarn.service("statusFormats", function () {

    function timeOfDay(value) {
        var d = new Date(1976, 01, 01, 0, value, 0, 0);
        return d.getHours() + ":" + ("00" + d.getMinutes()).substring(0, 2);
    }

    return {
        timeOfDay: timeOfDay
    }

});

