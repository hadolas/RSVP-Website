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
	res.redirect("/");
}

middlewareObject.checkVals = function(req, res, next) {
	console.log("===MIDDLEWARE===");
	// console.log("Attending: " + req.body.a);
	// console.log("Guest num: " + req.body.email.guest_number);
	// console.log("Guest names: " + req.body.email.guest_names);
	
	var attending = req.body.attending;
	var guest_num = Number(req.body.email.guest_number);
	var guest_names = req.body.email.guest_names;
	var namesArray = guest_names.length


	for(var i=0; i<namesArray; i++) {
		// console.log("Guests Attending: " + guest_num);
		// console.log("Sorting array: " + guest_names.length);
		if(guest_num === 0 || attending === "no") {
			guest_num = 0;
			guest_names = [];
			// console.log("ZERO")
			break;
		}
		else if(guest_num===guest_names.length) {
			// console.log("MATCH: " + guest_num + " = " + guest_names.length);
			// console.log(guest_names);
			break;
		} else {
			// console.log("Doesn't match")
			guest_names.pop();
		}
	}

	req.body.email.guest_number = guest_num;
	req.body.email.guest_names = guest_names;
	console.log("Guest Num  : " + req.body.email.guest_number);
	console.log("Guest Names: " + req.body.email.guest_names);

	

	console.log("================");
	return next();
}

module.exports = middlewareObject;