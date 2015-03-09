var Sequilize = require("sequelize");
var exports = module.exports = {};

/*
If you're getting an error try ensuring all the information below is correct for YOUR local DB.
*/
var DB_ = "UMass-Books";
var user_ = "pschau";
var pass_ = "password"; //My local DB accepts all connections from localhost so this can be anything

var sequelize = new Sequilize(DB_, user_, pass_, {
	host: "localhost",
	dialect: "postgres",
	pool:{
		max: 5,
		min: 0,
		idle: 1000
	}
})

/*
	Define the "model" for the book table.
	This is the structure Sequelize will use when accessing the DB.
*/


var BookTable = sequelize.define("Book", {
	title: Sequilize.STRING(255),
	author: Sequilize.STRING(60),
	isbn10: Sequilize.STRING(10),
	isbn13: {
		type: Sequilize.STRING(13),
		primaryKey: true
	},
	publicationDate: Sequilize.DATE,
	version: Sequilize.INTEGER,
	cover: Sequilize.BLOB,
	},

	{
	timestamps: false,
	freezeTableName: true,
	tableName: "book"
});

/*
	Define the "model" for the "user" table.
	This is the structure Sequelize will use when accessing the DB.
*/
var UsersTable = sequelize.define("Users",{
	username:{
		type: Sequilize.STRING(20),
		primaryKey: true,
		validate:{
			isAlphanumeric: true
		}
	},
	password: Sequilize.STRING(128),	
	firstname: Sequilize.STRING(30),
	lastname: Sequilize.STRING(30),
	email: {
		type: Sequilize.STRING(50),
		validate:{
			isEmail: true
		}
	},
	phone: {
		type: Sequilize.STRING(12),
		validate:{
			isNumeric: true
		}
	},
	institution: Sequilize.STRING(60),
	},

	{
	timestamps: false,
	freezeTableName: true,
	tableName: "users"
	});

/*
	Adds a user if it is not in the DB based off their username.
	There is currently no way to tell if the function entered a new row
	or if it existed already.
*/

exports.addUser = function(username_, password_, firstName_, lastName_, email_, phone_, institution_)
{
	var found = UsersTable.findOrCreate({ where: {username: username_},
		/*
			Details to be added if no such row is found.
		*/
		defaults:{
			username: username_,
			password: password_,
			firstname: firstName_,
			lastname: lastName_,
			email: email_,
			phone: phone_,
			institution: institution_
		}
	});
	found.then(function(record, created){
		// added = record[0].isNewRecord;//This is the correct value it just needs to be extracted, either works
		// console.log(record[0].options.isNewRecord);
		added = record[0].options.isNewRecord;
	});
};

exports.loginUser = function(username_, password_)
{
	
	UsersTable.find({
      where: {username:username_, password:password_},
      
 	 }).success(function(match) {
    	return match;
 	});
	// sequelize.query('SELECT * FROM Users WHERE username="' + username_ + '" AND password="' + password_ + '";').success(function(result){
	// 	return result;
	// });

};

// Legacy code that I don't want to remove just yet.
	// .error(function(){
	// 	console.log("something went wrong");
	// })

// var added;
// 	added = found.spread(function(record, created)
// 		{
// 			console.log(created);
// 			if (!created) { added = false;}
// 			console.log(added + "!");
// 		});
	// console.log(added + " ?");		
	// return added;

//addUser("Test", "Test", 21, "Test", "Calderwood","m","pca@online.net", "555555555", "UMass");


	
// }
// BookTest.sync({force: true}).then(function () { //Change sync({force: true}) to sync() to avoid dropping table on updates
// 	return BookTest.create({
// 		testString: "Brave New World",
// 		testInt: 1932
// 	});
// });

// -------------------------------------------------------------- OLD CODE -------------------------------------------------------

/*	sex: { //Three options, male, female, other.
		type: Sequilize.STRING(1),
		validate:{
			is: /^m$|^f$|^o$/i //Should be either a "m", "f", or "o", case insensitive
		}
	},*/

	/*	age: {
		type: Sequilize.INTEGER,
		validate:{
			isInt: true
		}
	},*/