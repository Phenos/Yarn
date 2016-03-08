yarn.service("validateStory", function validateStory(Validation,
                                                     assert) {

    var validation = new Validation({
        name: "Validating the Story metadata and basic requirements"
    });

    validation.assert({
        pass: "The Story has a Name",
        fail: "The Story object doesnt have a Name"
    }, function (state) {
        var name = state.resolveValue(assert("Story", "has", "Name"));
        return typeof(name) === "string" && name !== "";
    });

    validation.assert({
        pass: "The Story has a Description",
        fail: "The Story object doesnt have a Description",
        type: "warning"
    }, function (state) {
        var description = state.resolveValue(assert("Story", "has", "Description"));
        return typeof(description) === "string" && description !== "";
    });


    return validation;
});