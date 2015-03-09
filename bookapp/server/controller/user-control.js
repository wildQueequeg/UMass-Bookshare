var User = require('../model/user.js');

module.exports.create = function (req, res) {
	console.log("CONTROL");
	console.log(req.body);
	var newUser = User.create({
			username: req.body.username,
			password: req.body.password,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			phone: req.body.phone,
			institution: req.body.institution,
		});
	res.json(newUser); // sends back user jsonObject.
}; 

