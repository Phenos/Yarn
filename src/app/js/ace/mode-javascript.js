// Rename to "YarnScript" instead of javascript
ace.define("ace/mode/javascript_highlight_rules",
    ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"],
    function (require, exports) {
        "use strict";

        var oop = require("../lib/oop");
        var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
//        var identifierRe = "[a-z][a-zA-Z ]*";
//        var identifierRe = /([@a-z][a-z_A-Z0-9]*[\s]*)+/;
        var identifierRe = /(?:([@a-z][a-z_]*)([\s]+(?:[@a-z][a-z_0-9]+))*)/;

        var JavaScriptHighlightRules = function () {

            var escapedRe = "\\\\(?:x[0-9a-fA-F]{2}|" + // hex
                "u[0-9a-fA-F]{4}|" + // unicode
                "u{[0-9a-fA-F]{1,6}}|" + // es6 unicode
                "[0-2][0-7]{0,2}|" + // oct
                "3[0-7][0-7]?|" + // oct
                "[4-7][0-7]?|" + //oct
                ".)";

            this.$rules = {
                "start": [
                    comments("start"),
                    {
                        token: "string",
                        regex: /'/,
                        next: "qstring"
                    }, {
                        token: "string",
                        regex: /"/,
                        next: "qqstring"
                    }, {
                        token: "camelcase",
//                        regex: /([@A-Z][a-z_A-Z0-9]+)/
//                        regex: /([@A-Z][a-z_A-Z0-9]*[\s]*)+/
                        regex: /(?:([@A-Z][a-z_A-Z0-9]*)([\s]+(?:[@A-Z][a-z_A-Z0-9]+))*)/
                    }, {
                        token: "constant.numeric", // hex
                        regex: /0(?:[xX][0-9a-fA-F]+|[bB][01]+)\b/
                    }, {
                        token: "constant.numeric", // float
                        regex: /[+-]?\d[\d_]*(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/
                    }, {
                        token: "identifier",
                        regex: identifierRe
                    }, {
                        token: "punctuation.operator",
                        regex: /[?:,;.]/,
                        next: "start"
                    }, {
                        token: "paren.lparen",
                        regex: /[\[({]/,
                        next: "start"
                    }, {
                        token: "paren.rparen",
                        regex: /[\])}]/
                    }
                ],
                "qqstring": [
                    {
                        token: "constant.language.escape",
                        regex: escapedRe
                    }, {
                        token: "string",
                        regex: "\\\\$",
                        merge : true,
                        next: "qqstring"
                    }, {
                        token: "string",
                        regex: '"',
                        next: "start"
                    }, {
                        merge : true,
                        defaultToken: "string"
                    }
                ],
                "qstring": [
                    {
                        token: "constant.language.escape",
                        regex: escapedRe
                    }, {
                        token: "string",
                        regex: "\\\\$",
                        merge : true,
                        next: "qstring"
                    }, {
                        token: "string",
                        regex: "'",
                        next: "start"
                    }, {
                        merge : true,
                        defaultToken: "string"
                    }
                ],
                "camelcase": [
                ]
            };

            this.normalizeRules();
        };

        oop.inherits(JavaScriptHighlightRules, TextHighlightRules);

        function comments(next) {
            return [
                {
                    token: "comment", // multi line comment
                    regex: /\/\*/,
                    next: [
                        {
                            token: "comment",
                            regex: "\\*\\/",
                            merge : true,
                            next: next || "pop"
                        }, {
                            defaultToken: "comment",
                            merge : true,
                            caseInsensitive: true
                        }
                    ]
                }, {
                    token: "comment",
                    regex: "\\/\\/",
                    next: [
                        {
                            token: "comment",
                            regex: "$|^",
                            merge : true,
                            next: next || "pop"
                        },{
                            defaultToken: "comment",
                            merge : true,
                            caseInsensitive: true
                        }
                    ]
                }
            ];
        }

        exports.JavaScriptHighlightRules = JavaScriptHighlightRules;
    });


ace.define("ace/mode/javascript",
    ["require", "exports", "module",
        "ace/lib/oop", "ace/mode/text",
        "ace/mode/javascript_highlight_rules"],
    function (require, exports) {
    "use strict";

    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var JavaScriptHighlightRules = require("./javascript_highlight_rules").JavaScriptHighlightRules;

    function Mode() {
        this.HighlightRules = JavaScriptHighlightRules;
    }

    oop.inherits(Mode, TextMode);

    (function () {
        this.$id = "ace/mode/javascript";
    }).call(Mode.prototype);

    exports.Mode = Mode;
});
