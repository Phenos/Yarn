yarn.service("Validator", function (validateStory) {

    /**
     * Class for validator
     * @constructor
     */

    function Validator() {
        this.reset();
    }

    Validator.prototype.reset = function () {
        var blankResults = {
            pass: [],
            fail: [],
            errors: [],
            warnings: [],
            all: []
        };
        this.results = blankResults;
    };

    Validator.prototype.run = function (state) {
        this.reset();
        this.validate(validateStory, state);
        return this.results;
    };

    Validator.prototype.validate = function (validation, state) {
        var self = this;
        angular.forEach(validation.assertions, function (assertion) {
            var passed = assertion.test(state);
            var message = passed ? assertion.pass : assertion.fail;
            var result = new Result(passed, message, assertion.type);
            self.results.all.push(result);
            if (result.passed) {
                self.results.pass.push(result);
            } else {
                self.results.fail.push(result);
                if (result.type === "error") self.results.errors.push(result);
                if (result.type === "warning") self.results.warnings.push(result);
            }

        });
    };


    function Result(passed, message, type) {
        this.passed = passed;
        this.message = message;
        this.type = type;
    }

    return new Validator();
});


yarn.service("Validation", function (ValidatorAssertion) {

    function Validation(options) {
        this.name = options.name;
        this.assertions = [];
    }

    Validation.prototype.assert = function (options, fn) {
        this.assertions.push(new ValidatorAssertion(options, fn));
        return this;
    };

    return Validation;

});

yarn.service("ValidatorAssertion", function () {

    function ValidatorAssertion(options, fn) {
        this.pass = options.pass;
        this.fail = options.fail;
        this.fn = fn;
        this.type = options.type || "errror";
    }

    ValidatorAssertion.prototype.test = function (state) {
        return this.fn(state);
    };

    return ValidatorAssertion;

});


