yarn.service("Validator", function (validateStory) {

    /**
     * Class for validator
     * @constructor
     */
    function Validator() {
        this.results = [];
    }

    Validator.prototype.run = function (state) {
        this.results = [];
        this.validate(validateStory, state);
        return this.results;
    };

    Validator.prototype.validate = function (validation, state) {
        var self = this;
        angular.forEach(validation.assertions, function (assertion) {
            var passed = assertion.test(state);
            var message = passed ? assertion.pass : assertion.fail;
            self.results.push(new Result(passed, message, assertion.type));
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
    }

    ValidatorAssertion.prototype.test = function (state) {
        return this.fn(state);
    };

    return ValidatorAssertion;

});


