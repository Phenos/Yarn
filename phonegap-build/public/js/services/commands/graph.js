yarn.service('graphCommand', graphCommand);

function graphCommand(yConsole) {

    function handler() {
        yConsole.debug('<graph width="800" height="400" thing-is-a="space" predicate="linksto"></graph>');
    }

    return {
        name: "graph",
        shortDescription: "Show game elements using interactive graphs",
        longDescription: "Show game elements using interactive graphs",
        handler: handler
    };

}