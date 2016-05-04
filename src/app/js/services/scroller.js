yarn.service("Scroller", function ($window, Monitor) {

    function Scroller() {
        var self = this;

        self.position = 0;
        self.previousPosition = 0;
        self.isBottom = false;
        self.isTop = false;
        self.direction = "down";
        self.bottomPosition = 0;

        self.element = null;

        self.monitor = new Monitor("scroller", "Scroller");
        self.monitor.show();
        self.monitor.meta = [
            {
                label: "Position",
                name: "position"
            },
            {
                label: "Is at Top",
                name: "isTop"
            },
            {
                label: "Is at Bottom",
                name: "isBottom"
            },
            {
                label: "Scroll Height",
                name: "scrollHeight"
            },
            {
                label: "Client Height",
                name: "clientHeight"
            },
            {
                label: "Bottom position",
                name: "bottomPosition"
            },
            {
                label: "Direction",
                name: "direction"
            }
        ];

        self.monitor.data = {
            top: 0,
            direction: "down",
            isTop: true,
            isBottom: true
        };

    }

    Scroller.prototype.scrollToPosition = function (_targetPosition, duration) {
        var self = this;
        self.update();
        var targetPosition = _targetPosition;
        if (angular.isString(targetPosition)) {
            if (targetPosition === "bottom") {
                targetPosition = self.bottomPosition;
            }
        }
//        console.log("scrollToPosition", self.position, targetPosition, duration);

        var startPosition = self.position;
        var animation = new Animation(function (anim) {
            var distCompleted = (targetPosition - startPosition) * anim.progress;
            self.element.scrollTop = parseInt(startPosition + distCompleted);
        }, duration);

        animation.start();
    };

    Scroller.prototype.bind = function (element) {
        var self = this;

        self.element = element;
        angular.element(element).bind("scroll", onScroll);

        function onScroll() {
            self.update();

            self.monitor.update({
                position: self.position,
                isTop: self.isTop,
                isBottom: self.isBottom,
                clientHeight: self.clientHeight,
                scrollHeight: self.scrollHeight,
                bottomPosition: self.bottomPosition,
                direction: self.direction
            });

            self.previousPosition = self.position;
        }
    };

    Scroller.prototype.update = function () {
        var self = this;

        self.position = self.element.scrollTop;
        self.scrollHeight = self.element.scrollHeight;
        self.clientHeight = self.element.clientHeight;
        self.bottomPosition = self.scrollHeight - self.clientHeight;
        self.isTop = self.position <= 0;
        self.isBottom = self.position >= self.bottomPosition;

        if (self.position > self.previousPosition) {
            self.direction = "down";
        } else {
            self.direction = "up";
        }
    };

    function Animation(onStep, duration) {
        this.startTime = null;
        this.endTime = null;
        this.timer = null;
        this.duration = duration;
        this.onStep = onStep;
        this.progress = 0;
        this.completed = false;
    }

    Animation.prototype.start = function () {
        var self = this;

        this.completed = false;
        this.progress = 0;
        this.startTime = performance.now();
        this.endTime = this.startTime + this.duration;

        $window.requestAnimationFrame(animate);

        function animate() {
            var now = performance.now();
            var completed = now - self.startTime;
            self.progress = 1 / self.duration * completed;
            if (self.progress >= 1) {
                self.completed = true;
                self.progress = 1;
            }
            self.onStep(self);
            if (now > self.endTime) {
                self.stop();
            }
            if (!self.completed) {
                $window.requestAnimationFrame(animate);
            }
        }
    };

    Animation.prototype.stop = function () {
    };

    return Scroller;
});
