var models = require('../models');
var User   = models.User;

exports.newAndSave = function(loginname, password, email, callback) {
	var user = new User();
	user.loginname = loginname;
	user.password  = password;
	user.email 	   = email;

	user.save(callback);
}

exports.add = function(a, b) {
	return a + b;
}
