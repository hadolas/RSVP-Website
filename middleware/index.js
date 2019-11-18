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

module.exports = middlewareObject;