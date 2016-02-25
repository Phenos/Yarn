yarn.service("player", function (writers,
                                 promptLoop) {

    var service = {};

    service.update = function () {
        writers
            .LogStoryIntroduction()
            .DescribeWhereYouAre();
        promptLoop.update();
    };

    return service;

});