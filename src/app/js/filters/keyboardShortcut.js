yarn.filter('keyboardShortcut', function keyboardShortcutFilter($window) {

    return function (str) {
        var returnValue;
        if (str) {
            var keys = str.split('-');
            var isOSX = /Mac OS X/.test($window.navigator.userAgent);
            var seperator = (!isOSX || keys.length > 2) ? '+' : '';
            var abbreviations = {
                M: isOSX ? '⌘' : 'Ctrl',
                A: isOSX ? 'Option' : 'Alt',
                S: 'Shift'
            };
            returnValue = keys.map(function (key, index) {
                var last = index == keys.length - 1;
                return last ? key : abbreviations[key];
            }).join(seperator);
        }
        return returnValue;
    };

});

