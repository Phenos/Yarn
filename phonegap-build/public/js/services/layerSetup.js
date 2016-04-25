/**
 * Provide the liste of state layers in order of priority.
 * Layer are used when resolving the value of assertions.
 * Priority is from lower to higher in the array.
 */
yarn.factory('layerSetup', function layerSetup() {

    return ["code", "session", "step"];

});




