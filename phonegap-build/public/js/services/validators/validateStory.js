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
        pass: "The Story must have a Release Number in a number format",
        fail: "The Story object doesnt have a Release Number in a number format",
        type: "error"
    }, function (state) {
        var releaseNumber = state.resolveValue(assert("Story", "has", "Release Number"));
        return typeof(releaseNumber) === "number" && releaseNumber !== "";
    });

    validation.assert({
        pass: "The Story must have a Unique ID",
        fail: "The Story object doesnt have a Unique ID",
        type: "error"
    }, function (state) {
        var uniqueID = state.resolveValue(assert("Story", "has", "Unique ID"));
        return typeof(uniqueID) === "string" && uniqueID !== "";
    });


    return validation;
});