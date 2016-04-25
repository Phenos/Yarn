yarn.directive('userInput', UserInputDirective);


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
        template:'<form layout=row flex><div flex=100 class="md-block inputContainer"><md-autocomplete md-whiteframe=4 placeholder="Enter a command" md-no-cache=true ng-keypress=userInput.keypress($event) ng-focus=userInput.focus() ng-blur=userInput.blur() md-select-on-focus md-selected-item=selectedItem md-item-text=selectedItem.autocomplete md-search-text=userInput.text md-items="item in userInput.getAutoCompleteMatches(userInput.text)"><div class=autocomplete-match><div class=autocomplete-command ng-bind-html=item.display></div><div class=autocomplete-description ng-bind-html=item.description></div></div></md-autocomplete></div></form>',
        controller: UserInputController
    };

    function UserInputController(commands, $element) {
        var self = this;

        this.hasFocus = false;

        this.getAutoCompleteMatches = function (searchText) {
            var allCommands = [];

            angular.forEach(commands.all, function (_command) {
                var command = {};
                command.name = _command.name;
                command.description = _command.shortDescription;
                command.display = _command.autocompletePreview || _command.name;
                command.autocomplete = _command.autocompleteText || _command.name;
                allCommands.push(command);
            });

            var results = [];

            angular.forEach(allCommands, function (command) {
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