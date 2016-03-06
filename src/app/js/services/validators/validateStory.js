yarn.service("validateStory", function validateStory(Validation) {

    var validation = new Validation({
        name: "Validating the Story metadata and basic requirements"
    });

    validation.assert({
        pass: "The Story has a Name",
        fail: "The Story object doesnt have a Name"
    }, function (state) {
        var title = state.resolveValue({
            subject: "Story",
            predicate: "has",
            object: "Name"
        });
        return typeof(title) === "string" && title !== "";
    });

    validation.assert({
        pass: "The Story has a Description",
        fail: "The Story object doesnt have a Description"
    }, function (state) {
        var description = state.resolveValue({
            subject: "Story",
            predicate: "has",
            object: "Description"
        });
        return typeof(description) === "string" && description !== "";
    });


    return validation;
});