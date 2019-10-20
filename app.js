var express = require("express");
var app = express();

app.get("/", function(req, res) {
	res.send("This is the homepage");
});

app.listen(3000, function() {
	console.log("Serving RSVP App");
});