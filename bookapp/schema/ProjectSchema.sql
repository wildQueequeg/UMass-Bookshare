create table Users(
	username CHAR(20),
	password CHAR(128),
	firstName CHAR(30),
	lastName CHAR(30),
	age INTEGER,
	sex CHAR(1),
	email CHAR(50),
	phone CHAR(12),
	institution CHAR(60),
	PRIMARY KEY(username)
);

create table Book(
	title VARCHAR(255),
	author CHAR(60),
	isbn10 CHAR(10),
	isbn13 CHAR(13),
	publicationDate DATE,
	version SMALLINT,
	cover BYTEA,
	PRIMARY KEY(isbn13)
);

create table Wishlist(
	username CHAR(20),
	isbn13 CHAR(13),
	wishDate DATE,
	PRIMARY KEY(username, isbn13),
	FOREIGN KEY(username) REFERENCES Users,
	FOREIGN KEY(isbn13) REFERENCES Book
);

create table Listing( 
	listID CHAR(32),
	username CHAR(20),
	isbn13 CHAR(13),
	forRent BOOLEAN,
	forSale BOOLEAN,
	forBorrow BOOLEAN,
	available BOOLEAN,
	price INTEGER,
	listDate TIMESTAMP,
	PRIMARY KEY(listID),
	FOREIGN KEY(username) REFERENCES Users,
	FOREIGN KEY(isbn13) REFERENCES Book
);

create table Rating(
	ratedUser CHAR(20),
	ratingUser CHAR(20),
	rating INTEGER,
	PRIMARY KEY(ratedUser),
	FOREIGN KEY(ratedUser) REFERENCES Users(username),
	FOREIGN KEY(ratingUser) REFERENCES Users(username)
);
/* test */
/*INSERT INTO users (username, password, firstName, lastName, email, phone, institution)
VALUES ('userTest', 'pwTest', 'testFirst', 'testLast', 'test@gmail.com', '55555555', 'UMass-Amherst');*/