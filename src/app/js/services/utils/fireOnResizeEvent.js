yarn.service("fireOnResizeEvent", function () {
    return function fireOnResizeEvent() {
        window.dispatchEvent(new Event('resize'));

        //var width, height;
        //
        //if (navigator.appName.indexOf("Microsoft") != -1) {
        //    width  = document.body.offsetWidth;
        //    height = document.body.offsetHeight;
        //} else {
        //    width  = window.outerWidth;
        //    height = window.outerHeight;
        //}
        //
        //window.resizeTo(width - 1, height);
        //window.resizeTo(width + 1, height);
        //
        //console.log("onResize");
    }
});