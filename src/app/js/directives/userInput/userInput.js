angular.module('yarn').directive('userInput', UserInputDirective);
angular.module('yarn').filter('rawHtml', ['$sce', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
}]);


function UserInputDirective() {
    return {
        restrict: 'E',
        bindToController: {
            text: '=',
            onFocus: '&',
            onEscapeFocus: '&',
            onSubmit: '&'
        },
        scope: {},
        controllerAs: 'userInput',
        templateUrl: './html/userInput.html',
        controller: UserInputController
    };

    function UserInputController($scope, $element, hotkeys, commandsRegistry) {
        var self = this;

        this.hasFocus = false;

        hotkeys.bindTo($scope)
            .add({
                combo: 'esc',
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                description: 'Focus back to the editor',
                callback: function () {
                    self.toggleFocus();
                }
            });

        //todo: command definitions should be in a separate service
        this.getAutoCompleteMatches = function (searchText) {
            var commands = [];

            angular.forEach(commandsRegistry.commands, function (_command) {
                var command = {};
                command.name = _command.name;
                command.description = _command.shortDescription;
                command.display = _command.autocompletePreview || _command.name;
                command.autocomplete = _command.autocompleteText || _command.name;
                commands.push(command);
            });

            var results = [];

            angular.forEach(commands, function (command) {
                var _name = command.name.trim().toLowerCase();
                var _searchText = searchText.trim().toLowerCase();
                var matched = false;

                // Any match that "start with"
                if (_name.indexOf(_searchText) === 0) {
                    // Add on top (is a better match)
                    results.unshift(command);
                    matched = true;
                }

                //Any later match for 3 char at least
                if (!matched &&
                    (_name.indexOf(_searchText) >= 1) &&
                    (_searchText.length > 2)
                ) {
                    // Add at bottom
                    results.push(command);
                }
            });

            return results;
        };

        this.keypress = function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                self.submit();
                this.focus();
            }
        };

        this.toggleFocus = function () {
            if (this.hasFocus) {
                this.blur();
            } else {
                this.focus();
            }
        };

        this.focus = function () {
            if (!this.hasFocus) {
                //console.log("console in!");
                $element.find("input")[0].focus();
                this.hasFocus = true;
                this.onFocus();
            }
        };

        this.blur = function () {
            if (this.hasFocus) {
                //console.log("console out!");
                $element.find("input")[0].blur();
                this.hasFocus = false;
                this.onEscapeFocus();
            }
        };

        this.submit = function () {
            //console.log("this.submit!!!", this.text);
            if (this.text.trim() !== "") {
                this.onSubmit({text: this.text});
                this.text = "";
            }
            this.focus();
        };
    }
}