
// connect to the database and return the pointer to db
var db = null;
var conString = null;
module.exports.init = function(){
	//connect to the database
	var db = require("pg");
	var conString = "postgres://username:password@localhost/UMass-Books"

}

module.exports.getInstance = function(){
    return db;
}

module.exports.getConnection = function(){
	return conString;
}