// Middleware

var middlewareObject = {}

middlewareObject.checkPasscode = function(req, res, next) {
	if(req.body.code===process.env.CODE) {
		// console.log(" >>>>  Correct <<<< ")
		req.session.code = 1;
		return next()
	} else {
		req.session.code = 0;
		console.log("That is not correct........")
	}
	req.flash("error", "Incorrect passcode.")
	res.redirect("/");
}

middlewareObject.checkVals = function(req, res, next) {
	// console.log("===MIDDLEWARE===");
	
	var attending = req.body.attending;
	var guest_num = Number(req.body.email.guest_number);
	var guest_names = req.body.email.guest_names;
	var namesArray = guest_names.length


	for(var i=0; i<namesArray; i++) {
		if(guest_num === 0 || attending === "no") {
			guest_num = 0;
			guest_names = [];
			break;

		} else if(guest_num===guest_names.length) {
			break;

		} else {
			guest_names.pop();
		}
	}

	req.body.email.guest_number = guest_num;
	req.body.email.guest_names = guest_names;

	// console.log("================");
	return next();
}


middlewareObject.validateFormInputs = function(req, res, next) {
	// var inputErrors = false;
	var errors = [];
	// req.session.errors=null;

	var guest_num = Number(req.body.email.guest_number);

	var form = {
		fname : req.body.email.fname,
		lname : req.body.email.lname,
		email : req.body.email.email,
		attending : req.body.attending,
		guest_num : req.body.email.guest_number,
		guest_names : req.body.email.guest_names
	}

	// console.log("1 : " + form.guest_names[1])

	// console.log("EMAIL: " + form.email)
	// console.log("EMAIL: " + req.body.email.email)

	if(!req.body.email.fname) {
		errors.push("Please enter first name.");
	}
	if(!req.body.email.lname) {
		errors.push("Please enter last name.");
	}
	if(!req.body.email.email) {
		errors.push("Please enter an email address.");
	}
	if(!req.body.attending) {
		errors.push("Please state if you will be attending.");
	} else {
		if(req.body.attending==="yes") {
			// console.log("REQ GN: " + Number(req.body.email.guest_number));
			if(!req.body.email.guest_number && req.body.email.guest_number!==0) {
				// console.log("Please select how many guests will be attending with you.");
				errors.push("Please select how many guests will be attending with you.");
			} else {
				// console.log("GUESTNUMBER: " + req.body.email.guest_number)
				// console.log("GN: " + guest_num)
				// if(guest_num===0) {
					// console.log("Zero")
				// } else if(req.body.email.guest_number>0) {
					// console.log("PEOPLE")
				// }
				if(req.body.email.guest_number!==0) {
					// console.log("Show " + req.body.email.guest_number + "inputs");
					// console.log("NAAMES: " + req.body.email.guest_names.length)
					// if(req.body.email.guest_number!==req.body.email.guest_names.length) {
						// console.log("Please give the names of all guests attending with you.")
					// }
					// console.log("names: " + req.body.email.guest_names)
					for(var i=0; i<req.body.email.guest_names.length; i++) {
						console.log("name: " + req.body.email.guest_names[i]);
						if(req.body.email.guest_names[i] === "") {
							console.log("Please give the names of all guests attending with you.");
							errors.push("Please give the names of all guests attending with you.");
							break;
						}
					}
				}
			}
		}
	}

	if(errors.length===0) {
		next();
	} else {
		// req.session.errors = errors;
		req.flash("error", errors)
		res.render("form.ejs", {error:errors, form:form});
	}


	// console.log(errors);
}

module.exports = middlewareObject;