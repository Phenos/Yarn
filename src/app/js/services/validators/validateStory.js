yarn.service("validateStory", function validateStory(Validation,
                                                     assert) {

    var validation = new Validation({
        name: "Validating the Story metadata and basic requirements"
    });

    validation.assert({
        pass: "The Story must have a Name",
        fail: "The Story object doesnt have a Name",
        type: "error"
    }, function (state) {
        var name = state.resolveValue(assert("Story", "has", "Name"));
        return typeof(name) === "string" && name !== "";
    });

    validation.assert({
        pass: "The Story should have a Description",
        fail: "The Story object doesnt have a Description",
        type: "warning"
    }, function (state) {
        var description = state.resolveValue(assert("Story", "has", "Description"));
        return typeof(description) === "string" && description !== "";
    });

    validation.assert({
        pass: "The Story must have a ReleaseNumber in a number format",
        fail: "The Story object doesnt have a ReleaseNumber in a number format",
        type: "error"
    }, function (state) {
        var releaseNumber = state.resolveValue(assert("Story", "has", "ReleaseNumber"));
        return typeof(releaseNumber) === "number" && releaseNumber !== "";
    });

    validation.assert({
        pass: "The Story must have a UniqueID",
        fail: "The Story object doesnt have a UniqueID",
        type: "error"
    }, function (state) {
        var uniqueID = state.resolveValue(assert("Story", "has", "UniqueID"));
        return typeof(uniqueID) === "string" && uniqueID !== "";
    });


    return validation;
});