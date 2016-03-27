// Rename to "YarnScript" instead of javascript
ace.define("ace/mode/javascript_highlight_rules",
    ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"],
    function (require, exports) {
        "use strict";

        var oop = require("../lib/oop");
        var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
        var identifierRe = "[a-z][a-z ]*";

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
                        regex: /'(?=.|\s|\S)/,
                        next: "qstring"
                    }, {
                        token: "string",
                        regex: /"(?=.|\s|\S)/,
                        next: "qqstring"
                    }, {
                        token: "camelcase",
                        regex: /([@A-Z][a-z_A-Z0-9]+)/
                    }, {
                        token: "constant.numeric", // hex
                        regex: /0(?:[xX][0-9a-fA-F]+|[bB][01]+)\b/
                    }, {
                        token: "constant.numeric", // float
                        regex: /[+-]?\d[\d_]*(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/
                    }, {
                        token: [
                            "text", "text", "storage.type", "text", "paren.lparen"
                        ],
                        regex: "(:)(\\s*)(function)(\\s*)(\\()",
                        next: "function_arguments"
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
                property: [{
                    token: "text",
                    regex: "\\s+"
                }, {
                    token: [
                        "storage.type", "punctuation.operator", "entity.name.function", "text",
                        "keyword.operator", "text",
                        "storage.type", "text", "entity.name.function", "text", "paren.lparen"
                    ],
                    regex: "(" + identifierRe + ")(\\.)(" + identifierRe + ")(\\s*)(=)(\\s*)(function)(?:(\\s+)(\\w+))?(\\s*)(\\()",
                    next: "function_arguments"
                }, {
                    token: "punctuation.operator",
                    regex: /[.](?![.])/
                }, {
                    token: "support.function",
                    regex: /(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/
                }, {
                    token: "support.function.dom",
                    regex: /(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName|ClassName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/
                }, {
                    token: "support.constant",
                    regex: /(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/
                }, {
                    token: "identifier",
                    regex: identifierRe
                }, {
                    regex: "",
                    token: "empty",
                    next: "start"
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
    ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/javascript_highlight_rules"],
    function (require, exports) {
    "use strict";

    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var JavaScriptHighlightRules = require("./javascript_highlight_rules").JavaScriptHighlightRules;

    var Mode = function () {
        this.HighlightRules = JavaScriptHighlightRules;
    };

    oop.inherits(Mode, TextMode);

    (function () {
        this.$id = "ace/mode/javascript";
    }).call(Mode.prototype);

    exports.Mode = Mode;
});
