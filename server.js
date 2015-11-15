var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

var root = __dirname + '/build/static';
console.log(root);
app.use(express.static(root, {
    index: "index.html"
}));

app.listen(app.get('port'), function() {
    console.log('Node app is serving [' + root + '] on port', app.get('port'));
});

