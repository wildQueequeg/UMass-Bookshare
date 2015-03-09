# UMass Bookshare

UMass Bookshare is an online marketplace for students to buy, rent, sell, or share books. This web application connects students with others who have the books they want, right on their campus. This allows for greater convenience and more flexibility compared to other alternatives.

### Setting up PostgreSQL:

Install Postgres and Git. Note: On a Mac, you will need [Homebrew] (http://brew.sh). Replace apt-get with brew.

    sudo apt-get update
    sudo apt-get install postgresql postgresql-contrib
    sudo apt-get install git

Navigate to the folder where you want to install UMass-Bookshare and run:

    git clone https://github.com/WDoan/UMass-Bookshare.git

Change your Postgres password and create the database:

    sudo -u postgres psql postgres
    \password postgres

Enter password with Postgres. Press Ctrl-d to exit.

In the command prompt, type:

    sudo -u postgres createdb Umass-Books
    psql Umass-Books < UMass-BookShare/bookapp/schema/UmassProjectScema.sql


### Setting up Node.js and Dependencies:

Install [Node.js] (http://nodejs.org).

To install dependencies, navigate to the <code>bookapp</code> directory and run:

<code>sudo npm install</code>

### Running the App:

To run the app, execute:

<code>npm start</code>

In the browser, type <code>localhost:3000</code> in address bar.


### Bug Tracking

We will be using the Issues section of GitHub to track bugs and monitor their status. We can assign certain bugs to team members. Also, we will utilize tags in order to distinguish what kind of issue it is or if someone needs assistance.
