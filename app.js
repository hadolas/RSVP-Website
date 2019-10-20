var express = require("express");
var app = express();

app.use(express.static(__dirname+"/public"));

app.get("/", function(req, res) {
	// res.send("This is the homepage");
	res.render("index.ejs");
});

app.listen(3000, function() {
	console.log("Serving RSVP App");
});