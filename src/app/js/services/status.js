yarn.service("status", function () {

    function Status() {
        this.tasks = [];
        this.isWorking = false;
        this.isStatus = "";
    }


    Status.prototype.update = function () {
        var isWorking = false;
        angular.forEach(this.tasks, function (task) {
            if (task.isWorking === true) {
                isWorking = true;
            }
        });
        this.isWorking = isWorking;
    };

    Status.prototype.new = function (label) {
        var self = this;
        var task = new Task(label, function () {
            self.update();
        });
        this.tasks.push(task);
        return task;
    };


    function Task(label, update) {
        this.label = label;
        this.isWorking = false;
        this.isSuccess = null;
        this.update = update;
        this.startTime = 0;
        this.endTime = 0;
    }

    Task.prototype.start = function() {
        this.isWorking = true;
        this.isSuccess = null;
        this.startTime = performance.now();
        console.group("Task: " + this.label);
        this.update();
    };

    Task.prototype.complete = function() {
        this.isWorking = false;
        this.endTime = performance.now();
        console.info("Completed : " + parseInt(this.duration()));
        console.groupEnd();
        this.update();
    };

    Task.prototype.duration = function () {
        var duration = null;
        if (this.endTime && this.startTime) {
            duration = this.endTime - this.startTime;
        }
        return duration;
    };

    Task.prototype.fail = function() {
        this.isSuccess = false;
        this.complete();
    };

    Task.prototype.success = function() {
        this.isSuccess = true;
        this.complete();
    };


    return new Status();
});