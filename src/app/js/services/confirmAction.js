yarn.service("confirmAction", function ($mdDialog) {

    return function confirmAction(title, text, okCallback, cancelCallback) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title(title)
            .htmlContent(text)
            .ok('YES')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
            if (okCallback) okCallback()
        }, function() {
            if (cancelCallback) cancelCallback();
        });
    }

});