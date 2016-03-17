yarn.service("statusFormats", function () {

    function timeOfDay(value) {
        var d = new Date(1976, 01, 01, 0, value, 0, 0);
        return d.getHours() + ":" + d.getMinutes();
    }

    return {
        timeOfDay: timeOfDay
    }

});

