yarn.service("confirmAction", function ($mdDialog) {

    return function confirmAction(title, text, okCallback, cancelCallback, event, parent) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title(title)
            .htmlContent(text)
            .ok('YES')
            .cancel('Cancel');

        console.log("parent", parent[0]);
        if (parent) confirm.parent = parent[0];
        confirm.targetEvent = event;

        $mdDialog.show(confirm).then(function() {
            if (okCallback) okCallback()
        }, function() {
            if (cancelCallback) cancelCallback();
        });
    }

});