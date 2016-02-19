angular.module('yarn').factory('graphCommand', graphCommand);

function graphCommand(yConsole) {

    return function graphCommand() {
        yConsole.debug('<graph width="800" height="400" thing-is-a="room" predicate="linksto"></graph>');
    }

}