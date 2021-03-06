// Middleware

var middlewareObject = {}

middlewareObject.checkPasscode = function(req, res, next) {
	if(req.body.code===process.env.CODE) {
		req.session.code = req.body.code;
		return next()
	} else if(req.session.code===process.env.CODE){
		return next();
	} else {
		// req.session.code = 0;
		console.log("That is not correct........")
		req.flash("error", "Please enter the correct passcode to continue.")
		res.redirect("/");
	}
	
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

				if(req.body.email.guest_number!==0) {

					for(var i=0; i<req.body.email.guest_names.length; i++) {
				
						if(req.body.email.guest_names[i] === "") {
							// console.log("Please give the names of all guests attending with you.");
							errors.push("Please give the names of all guests attending with you.");
							break;
						}
					}
				}
			}
		}
	}

	if(errors.length===0) {
		if(req.body.attending==="no") {
			req.body.email.guest_number= "-";
		}
		if(req.body.email.guest_number===0 | req.body.email.guest_number==="-") {
			req.body.email.guest_names = "-";
		}
		next();
	} else {
		// req.session.errors = errors;
		req.flash("error", errors)
		res.render("form.ejs", {error:errors, form:form});
	}


	// console.log(errors);
}

module.exports = middlewareObject;