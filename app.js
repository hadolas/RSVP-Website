var express = require("express");
var app = express();
var API_KEY = process.env.API_KEY;
var DOMAIN = process.env.DOMAIN;
var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+"/public"));

// Root route
app.get("/", function(req, res) {
	res.render("index.ejs");
});


// POST route for email
app.post("/send", function(req, res) {
	var output = "<p>You have received a new RSVP.</p>" + 
	"<h3>Details: </h3>" +
	"<ul>" +
		"<li>Name: " + req.body.email.fname + " " + req.body.email.lname + "</li>" +
		"<li>Email: " + req.body.email.email +  "</li>" +
		"<li>Number of guests attending: " + req.body.email.guest_number +  "</li>" +
		"<li>Names of guests attending: " + req.body.email.guest_names +  "</li>" +
	"</ul>";

	var data = {
		from: 'Excited User <'+process.env.EMAIL+'>',
		to: process.env.EMAIL,
		subject: 'New RSVP Notification',
		html: output
	};

	mailgun.messages().send(data, function (error, body) {
		if(error) {
			console.log(error);
		}
		console.log(body);
		res.redirect("/");
	});

	// if(data){
	// 	console.log("Email sent. YAY!");
	// 	console.log(output);
	// 	console.log(req.body.email.guest_number);
	// 	console.log(req.body.email.guest_names);
	// 	res.redirect("/");	
	// } else {
	// 	console.log("THERE WAS AN ERROR");
	// }
	
});

app.listen(process.env.PORT || 3000, function() {
	console.log("Serving RSVP App");
});