var static = require('node-static');
var http = require('http');

var cool = require('cool-ascii-faces');

var file = new(static.Server)();

var app = http.createServer(function(req, res) {
	file.serve(req, res);
});

app.listen(process.env.PORT || 5000);