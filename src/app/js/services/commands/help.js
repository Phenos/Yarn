angular.module('yarn').factory('helpCommand', helpCommand);

function helpCommand(yConsole,
                     hotkeys) {

    hotkeys.add({
        combo: 'ctrl+h',
        description: 'Help',
        callback: function () {
            command("help");
        }
    });

    return function helpCommand() {
        yConsole.log(
            "The <em>Yarn</em> console allows you tu run commands and change the story.");
        yConsole.log(
            "Available commands: <em>help</em>, <em>load</em>, <em>inventory</em>, <em>state</em>, <em>tree</em>, <em>tokens</em>");
    }

}