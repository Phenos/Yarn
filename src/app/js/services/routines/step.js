yarn.service("step", function (postal,
                               events,
                               state,
                               dialogs,
                               assert,
                               synonyms,
                               statuses,
                               player,
                               storyLog) {

    function Step () {
        this.alreadyInsideStep = false;
        this.listeners = [];
        this.scope = {};
        this.channel = postal.channel("yarn.step");
        this.sequence = [
            "startStep",
            "stepIncrement",
            "stateUpdate",
            "actions",
            "events",
            "move",
            "dialogs",
            "storyEnds",
            "endStep"
        ];
    }

    Step.prototype.on = function on(sequenceItemId, callback) {
        this.channel.subscribe(sequenceItemId.toLowerCase(), callback);
    };

    Step.prototype.run = function run(action) {
        var self = this;

        self.scope.action = action || null;

        if (!this.alreadyInsideStep) {
            this.alreadyInsideStep = true;
            angular.forEach(this.sequence, function (eventId) {
                self.walk(eventId);
            });
        } else {
            console.warn("Prevented accidental step recursion!");
        }
        this.alreadyInsideStep = false;
    };

    Step.prototype.walk = function walk(sequenceItemId) {
        var self = this;
//        console.log("step.walk", sequenceItemId);

        publish("before " + sequenceItemId);
        publish(sequenceItemId);
        publish("after " + sequenceItemId);

        function publish(id) {
            self.channel.publish(id.toLowerCase(), self);
            events.process(id);
        }
    };



    var step = new Step();

    step.on("startStep", function () {
        state.step(1);
        events.trigger(assert("Story", "did", "Step"));
        events.trigger(assert("Player", "did", "Step"));
    });

    step.on("stateUpdate", function () {
        synonyms.update(state);
        statuses.update(state);
    });

    step.on("actions", function (_step) {
//        console.log("ACTIONS >>> ", step);
        _step.scope.action && _step.scope.action();
    });

    step.on("events", function () {
        events.process();
    });

    step.on("dialogs", function () {
        dialogs.process();
    });

    step.on("storyEnds", function () {
        var storyHasEnded = state.resolveValue(assert("Story", "has", "Ended"));
        if (storyHasEnded) {
            player.refresh();
        }
    });

    step.on("endStep", function () {
        // Flush the storyLog buffers
        storyLog.flushBuffers();
        // Remove the temporary "step" layer of assertions
        state.assertions.removeLayer("step");
    });


    return step;
});

