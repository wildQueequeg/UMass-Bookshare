var dbConnector = require('../../database/dbinit.js');
if (dbConnector==null) console.log("DATABASE CON NULL");



var User = function(jsObject){
	// example usage: new User({username: "user",  password: "pass", ... [etc]})
	this.username = jsObject.username;
	this.password = jsObject.password;
	this.firstName = jsObject.firstName;
	this.lastName = jsObject.lastName;

	// TODO: Validation of e-mail and phone
	this.email = jsObject.email;
	this.phone = jsObject.phone;
	//

	this.institution = jsObject.institution;
	

};

User.prototype.toString = function(){
	return String.format("[USER]->\nfirstName: {0}", this.firstName);
}


/**
 * Save a user to the database.
 * Used after changes are made to user
 * or when a new user is being saved for the first time.
 */
User.prototype.save = function(){
	//TODO: save to db
	// returns identifier for user
	var db = dbConnector.getInstance();
	var conString = dbConnector.getConnection();
	console.log("saving");
	console.log(db);
	var user_query = "INSERT INTO Users (username, password, firstName, lastName, email, phone, institution) VALUES("+ 
						this.username + "','" +
						this.password + "','" +
						this.firstName + "','" +
						this.lastName + "','" +
						this.email + "','" +
						this.phone + "','" +
						this.institution+"')";
	

	console.log(user_query);
	db.connect(conString, function(err, client, done) {
	  if (err) {
	    return console.error('error fetching client from pool', err);
	  }
	  client.query(user_query, function(err, result) {
	    done();
	    if (err) {
	      return console.error('error running query', err);
	    }
	    console.log(result.rows[0].number);
	  });

	});
	
};



// Exports the user for controller
module.exports = User;

// Static Methods //


/**
 * Retrieve user information from database.
 */
module.exports.get = function(username){
	//TODO: retrieve user based on user
};

/**
 * TODO
 */
module.exports.create = function(jsObject){
	//TODO: implement
	//		loop to create multiple user
	console.log("CREATE");
	var newUser = new User(jsObject);
	console.log("MODEL");
	console.log(newUser);
	newUser.save();
	return newUser;
};