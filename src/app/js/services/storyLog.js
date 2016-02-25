yarn.factory('storyLog', storyLogService);

function storyLogService() {

    function Logger() {

        var storyLog = {
            write: mockFunction,
            clear: mockFunction
        };

        function mockFunction() {
            console.error("storyLog not ready yet...");
        }

        this.register = function (directive) {
            storyLog = directive;
        };

        this.log = function (text) {
            storyLog.write(text, "log");
        };

        this.image = function (url) {
            storyLog.write("<img src='" + url + "' alt='coverpage'>", "image");
        };

        this.debug = function (text) {
            storyLog.write(text, "debug");
        };

        this.error = function (text) {
            storyLog.write(text, "error");
        };

        this.heading = function (text) {
            storyLog.write(text, "heading");
        };

        this.subHeading = function (text) {
            storyLog.write(text, "subHeading");
        };

        this.divider = function () {
            storyLog.write('<div class="divider"><svg viewBox="0 100 600 160" xmlns="http://www.w3.org/2000/svg"><g>' +
                '<path fill="#000" fill-rule="evenodd" stroke-width="1px" d="m130.424789,192.484528c5.347214,-7.567429 3.672729,-18.679031 -0.897858,-21.884766c-8.063118,-5.856277 -16.876259,6.366287 -12.837143,18.526962c4.031113,12.517319 14.122147,21.267746 27.859741,23.769913c29.803345,5.265564 88.753922,-27.178055 126.139771,-37.105835c27.772552,-7.374985 44.737732,3.70697 53.891937,15.980652c-18.814636,-13.327133 -35.962769,-8.691956 -53.610626,-5.4198c-40.492233,7.507782 -82.376175,39.384064 -126.758072,34.370102c-20.720802,-3.09549 -35.239151,-23.671143 -34.04528,-39.805344c0.106049,-1.433762 0.336189,-2.832489 0.697144,-4.180801c2.727554,-9.561676 7.519974,-13.483307 11.765518,-14.646454c11.540581,-3.161896 22.972786,17.871918 7.794868,30.39537z" id="path2383"/>' +
                '<path fill="#000" fill-rule="evenodd" stroke-width="1px" d="m487.119385,189.199921c-5.671265,7.631012 -3.895264,18.836304 0.952271,22.069031c8.551758,5.905624 17.89917,-6.419983 13.615234,-18.682968c-4.275269,-12.622757 -14.978088,-21.446869 -29.548309,-23.969986c-31.609894,-5.309998 -94.133331,27.406815 -133.785309,37.418243c-29.45575,7.437042 -47.449219,-3.73822 -57.158203,-16.115265c19.954956,13.439377 38.142334,8.765167 56.859802,5.465454c42.946655,-7.570999 87.369202,-39.715729 134.441101,-34.659546c21.976685,3.121552 37.375,23.870499 36.108826,40.140549c-0.112488,1.445938 -0.356628,2.856339 -0.739441,4.216019c-2.892883,9.642197 -7.975769,13.596756 -12.478638,14.769791c-12.240051,3.188507 -24.365143,-18.0224 -8.267334,-30.651321z" id="path2479"/>' +
                '</g></svg></div>', "divider");
        };

        this.thingImage = function (url) {
            storyLog.write('<img src="' + url + '">', "thingImage");
        };

        this.clear = function () {
            storyLog.clear();
        };

    }

    return new Logger();
}




