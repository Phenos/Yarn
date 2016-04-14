yarn.service("dialogs", function (state,
                                  assert,
                                  storyLog,
                                  yConsole) {

    var scriptCuttingRegex = /((^[A-Z ]+:)|(.*))/gm;
    var isVoice = /(^[A-Z ]+:)/g;

    var service = {};
    service.process = function process() {
        console.log("dialogs.process");

        var dialogs = state.assertions.find(assert(undefined, "says", undefined, {
            parent: null
        }));

        outputStatements(dialogs);

//        outputStatement(sayActions, "action");
//        outputStatement(sayMonologues, "log");
//        outputStatement(sayInsight, "insight");

//        console.log("Dialog > sayAssertions", sayAssertions);

        function outputStatements(dialogsAssertions) {
            angular.forEach(dialogsAssertions, function (assertion) {
                var statements = [];

                var type = assertion.object.id;

                var statement;
//                console.log("assertion", assertion);

                var isDialog = state.value("Object is a Dialog", {
                    Object: assertion.object
                });
                console.log("--isDialog", isDialog);
                if (isDialog) {
                    var script = state.value("Object has a Script", {
                        Object: assertion.object
                    });

                    // Her we start cutting the script in pieces
                    var matches = script.match(scriptCuttingRegex);
                    console.log("matches", matches);
                    var buffer = [];
                    var voice = "DEFAULT";
                    function flushBuffer() {
                        if (buffer.length > 0) {
                            var text = buffer.join("");
                            statements.push([text, voice]);
                            buffer = [];
                            console.log("flushed", [text, voice]);
                            voice = "DEFAULT";
                        }
                    }
                    angular.forEach(matches, function (_match) {
                        var match = _match.trim();
                        if (isVoice.test(match)) {
                            flushBuffer();
                            voice = match.substring(0, match.length - 1);
                            console.log("voice: ", voice);
                        } else {
                            buffer.push(match);
                        }
                    });
                    flushBuffer();
                } else {
                    statement = state.resolveValue(assert(
                        assertion.subject,
                        assertion.predicate,
                        assertion.object
                    ));
                    statement.push([statement, assertion.object.id]);
                }

                if (statements) {
                    angular.forEach(statements, function (_statement) {
                        // Log the dialog to the console
                        var ellipsis = "";
                        if (_statement[0].length > 20) {
                            ellipsis = "[…]";
                        }
                        var dialogExerpt = '"' + _statement[0].substring(0, 20) + ellipsis + '"';
                        yConsole.log("Dialog: <strong>" + voice + "</strong>:" + dialogExerpt, {
                            source: assertion.source
                        });

                        outputStatement(_statement[0], _statement[1]);
                    });
                } else {
                    yConsole.warn("Empty dialogs!", {
                        source: assertion.source
                    });
                }

                // Then remove the "say" assertion
//                state.assertions.remove(assertion);
                state.negate(assert(
                    assertion.subject,
                    assertion.predicate,
                    assertion.object
                ));

            });

            storyLog.flushBuffers();
        }

        function outputStatement(statement, _voice) {
            var voice = _voice.toLowerCase();
            var matchvoiceToLogTypes = {
                action: "action",
                monologue: "log",
                insight: "insight",
                narrator: "log"
            };

            var logType = matchvoiceToLogTypes[voice];
            if (logType) {
                var handler = storyLog.buffer()[logType];
                if (angular.isDefined(handler)) {
                    storyLog.buffer()[logType](statement);
                } else {
                    console.log("voice----> ", voice);
                }
            } else {
                console.log("voice----> ", voice);
            }

        }

    };

    return service;
});