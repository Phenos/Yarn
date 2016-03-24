yarn.service("keyboardShortcuts", function keyboardShortcuts(hotkeys,
                                                             editorTabs,
                                                             root,
                                                             tools,
                                                             yConsole,
                                                             IDE) {

    function init() {
        console.info("Configuring global keyboard mappings");
        var allowIn = ['INPUT', 'SELECT', 'TEXTAREA'];

        var keyboardMappings = [{
            description: 'Save and run the story',
            combo: 'mod+enter',
            callback: function (event) {
                event.preventDefault();
                IDE.saveAllAndRun();
            }
        }, {
            description: 'Open project files',
            combo: 'mod+o',
            allowIn: allowIn,
            callback: function (event) {
                event.preventDefault();
                tools.focus("project");
            }
        }, {
            combo: 'mod+s',
            description: 'Save the story',
            callback: function (event) {
                event.preventDefault();
                IDE.working(true);
                IDE.saveAll(function () {
                    IDE.working(false);
                });
            }
        }, {
            description: 'Run the story',
            combo: 'mod+shift+enter',
            callback: function (event) {
                event.preventDefault();
                IDE.run();
            }
        }, {
            description: 'Validate Current State',
            combo: 'mod+shift+v',
            callback: function (event) {
                event.preventDefault();
                tools.focus("validator");
                IDE.validate();
            }
        }, {
            description: 'Move to next open file',
            combo: 'alt+tab',
            callback: function (ev) {
                ev.preventDefault();
                // todo: put this logic in editorTabs
                editorTabs.selected = editorTabs.selected + 1;
                if (editorTabs.selected > editorFiles.files.length - 1) {
                    editorTabs.selected = 0;
                }
            }
        }, {
            description: 'Move to previous open file',
            combo: 'alt+shift+tab',
            callback: function (ev) {
                ev.preventDefault();
                // todo: put this logic in editorTabs
                editorTabs.selected = editorTabs.selected - 1;
                if (editorTabs.selected < 0) {
                    editorTabs.selected = editorFiles.files.length - 1;
                }
            }
        }, {
            combo: 'mod+esc',
            description: 'Show/Hide the Editor',
            callback: function () {
                root.toggleConsole();
            }
        }, {
            combo: 'mod+h',
            description: 'Show/Hide the help',
            callback: function () {
                root.toggleHelp();
            }
        }, {
            combo: 'esc',
            description: 'Show/hide the tools panel',
            callback: function () {
                root.toggleTools();
            }
        }, {
            combo: 'mod+k',
            description: 'Clear the console',
            callback: function () {
                yConsole.clear();
            }
        }
        ];

        angular.forEach(keyboardMappings, function (shortcut) {
            if (!shortcut.allowIn) shortcut.allowIn = allowIn;
            hotkeys.add(shortcut);
        });
    }

    return {
        init: init
    };

});