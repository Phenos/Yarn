yarn.service("weightAssertion", function (layerSetup) {

    return function weightAssertion(assertion) {
        var weight = 0;
        weight = weight + ((layerSetup.indexOf(assertion.layer)+1) * 10);
        weight = weight + ((assertion.value() === true) ? 1 : 0);
        return weight;
    }

});