yarn.service("fireOnResizeEvent", function () {
    return function fireOnResizeEvent() {
        window.dispatchEvent(new Event('resize'));
    }
});