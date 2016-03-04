/**
 * Calculates the relative weight of an assertion according to the
 * current layerSetup.
 * Weight is used when resolving the value of assertions.
 * The more weight an assertion has, the more chance it has to
 * be the value with priority over the others.
 */
yarn.service("weightAssertion", function (layerSetup) {

    return function weightAssertion(assertion) {
        var weight = 0;
        var fractionnalWeight = assertion.creationIndex / 1000000;
        console.log("fractionnalWeight: ", fractionnalWeight);
        weight = weight + ((layerSetup.indexOf(assertion.layer)+1) * 10);
        weight = weight + ((assertion.value() === true) ? 1 : 0);
        return weight + fractionnalWeight;
    }

});