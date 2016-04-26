yarn.service("parseThingLink", function () {

    function parseThingLink(text) {
        var parsedText = text || "";
        if (angular.isString(parsedText)) {

            // Render bracket links
            parsedText = parsedText.replace(/\[([^\]]+)]/g, function (match) {
                var tokens = match.substring(1, match.length - 1).split(":");
                var name = tokens[0];
                var id = tokens[1] || tokens[0];
                var action = tokens[2] || null;
                // Sanitize the id
                id = id.trim().toLowerCase().replace(/ /g, "_");

                return '<thing token="' + id +
                    '" text="' + name +
                    '" action="' + action +
                    '"></thing>'
            });

            // Render paragraph breaks and line breaks
            parsedText = parsedText.replace(/(\\[n])/g, '<br/>');
        }
        return parsedText;
    }

    return parseThingLink;

});