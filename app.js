var express = require("express");
var app = express();
var API_KEY = process.env.API_KEY;
var DOMAIN = process.env.DOMAIN;
var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});
var expressSession = require("express-session");
var middlewareObject = require("./middleware");
const SESS_LENGTH = 60000 * 30;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+"/public"));
app.use(expressSession({
	secret: process.env.SECRET,
	resave: false,
    saveUninitialized: false,
    cookie: {
    	maxAge: SESS_LENGTH
    }
}));

// Root route
app.get("/", function(req, res) {
	res.render("index.ejs", {NAME_A:process.env.NAME_A, NAME_B:process.env.NAME_B});
});

// POST route for passcode
app.post("/confirm", middlewareObject.checkPasscode, function(req, res) {
	res.redirect("/send_rsvp");
});

app.get("/send_rsvp", function(req, res) {
	if(req.session.code) {
		res.render("form.ejs");	
	} else {
		// res.send("Permission Denied");
		res.redirect("/");
	}
	
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