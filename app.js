var express = require("express");
var app = express();
var API_KEY = process.env.API_KEY;
var DOMAIN = process.env.DOMAIN;
var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});
var flash = require("connect-flash")
var expressSession = require("express-session");
var middlewareObject = require("./middleware");
const SESS_LENGTH = 60000 * 30;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+"/public"));
app.use(flash());
app.use(expressSession({
	secret: process.env.SECRET,
	resave: false,
    saveUninitialized: false,
    cookie: {
    	maxAge: SESS_LENGTH
    }
}));

app.use(function(req, res, next) {
	res.locals.errors = req.session.errors;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

// Root route
app.get("/", function(req, res) {
	res.render("index.ejs", {NAME_A:process.env.NAME_A, NAME_B:process.env.NAME_B});
});

// POST route for passcode
app.post("/confirm", middlewareObject.checkPasscode, function(req, res) {
	res.redirect("/send_rsvp");
});

app.get("/send_rsvp", middlewareObject.checkPasscode, function(req, res) {
	if(req.session.code) {
		var form = {
			fname : "",
			lname : "",
			email : "",
			attending : undefined,
			guest_num : undefined,
			guest_names : []
		}
		// console.log("THIS: " + req.body.guest_number)
		res.render("form.ejs", {form:form});	
	} else {
		// res.send("Permission Denied");
		res.redirect("/");
	}
	
});



// POST route for email
app.post("/send_rsvp", middlewareObject.checkPasscode, middlewareObject.checkVals, middlewareObject.validateFormInputs, function(req, res) {
	
	var full_name = req.body.email.fname + " " + req.body.email.lname;

	var output = "<p>You have received a new RSVP.</p>" + 
	"<h3>Details: </h3>" +
	"<ul>" +
		"<li><p><strong>Name: </strong>" + full_name + "</p></li>" +
		"<li><p><strong>Email: </strong>" + req.body.email.email +  "</p></li>" +
		"<li><p><strong>Attending: </strong>" + req.body.attending +  "</p></li>" +
		"<li><p><strong>Number of guests attending: </strong>" + req.body.email.guest_number +  "</p></li>" +
		"<li><p><strong>Names of guests attending: </strong>" + req.body.email.guest_names +  "</p></li>" +
	"</ul>";

	var data = {
		from: 'RSVP Website <'+process.env.EMAIL_FROM+'>',
		to: process.env.EMAIL_A +', '+ process.env.EMAIL_B,
		// to: process.env.EMAIL_A,
		subject: 'RSVP from ' + req.body.email.fname + " " + req.body.email.lname,
		html: output
	};

	mailgun.messages().send(data, function (error, body) {
		if(error) {
			console.log(error);
		}
		console.log(body);
		req.flash("success", "RSVP sent successfully!");
		res.redirect("/");
	});

	// if(data){
	// 	console.log("Email sent. YAY!");
	// 	console.log(output);
	// 	console.log(req.body.email.guest_number);
	// 	console.log(req.body.email.guest_names);
	// 	req.flash("success", "RSVP sent successfully!");
	// 	res.redirect("/");	
	// } else {
	// 	console.log("THERE WAS AN ERROR");
	// }
	
});

app.listen(process.env.PORT || 3000, function() {
	console.log("Serving RSVP App");
});