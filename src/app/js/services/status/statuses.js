yarn.service("statuses", function (state, assert, yarnScript) {

    function Statuses() {
        this.all = {};
        this.updated = Date.now().toString();
    }

    Statuses.prototype.add = function (object) {
        var self = this;
        self.all[object.id] = new Status(object);
    };

    Statuses.prototype.get = function (id) {
        var result = null;
        if (angular.isString(id)) {
            var token = text.trim().toLowerCase();
            var match = this.all[token];
            if (match) result = match;
        }
        return result;
    };

    Statuses.prototype.getAll = function (id) {
        var self = this;
        return Object.keys(self.all).map(function(k) {
            return self.all[k];
        });
    };

    Statuses.prototype.update = function (state) {
        //console.log("Status.update()");
        this.updated = Date.now().toString();
        var self = this;

        self.all = {};

        var statusObjects = state.resolveAll(assert(undefined, "is a", "Status"));

        angular.forEach(statusObjects, function (object) {
            self.add(object);
        });

    };

    function Status(object) {
        this.object = object;
        this.name = state.resolveValue(assert(this.object, "has", "Name"));
        this.value = state.resolveValue(assert(this.object, "has", "Value"));
        this.formula = state.resolveValue(assert(this.object, "has", "Formula"));
        this.format = state.resolveValue(assert(this.object, "has", "Format"));
        this.description = state.resolveValue(assert(this.object, "has", "Description"));

        this.standardIcon = state.resolveValue(assert(this.object, "has", "Icon"));
        this.SVGIcon = state.resolveValue(assert(this.object, "has", "SVGIcon"));
        if (this.SVGIcon) {
            this.SVGIcon = yarnScript.resolveRelativeURI(this.SVGIcon);
        }

    }

    Status.prototype.formattedValue = function () {
        var value = this.value;
        if (angular.isDefined(this.formula) && this.formula !== null) {
            value = this.formula;
        }
        return value
    };

    return new Statuses();

});