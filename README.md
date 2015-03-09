# UMass-Bookshare

### Installing postgresql:

Install postgres, and git:

    sudo apt-get update
    sudo apt-get install postgresql postgresql-contrib
    sudo apt-get install git

Navigate to the folder you want to install the server in and run:

    git clone https://github.com/WDoan/UMass-Bookshare.git

Change your postgres password and create the database:

    sudo -u postgres psql postgres
    \password postgres

Enter password with postgres. Press ctrl-d to exit

In ubuntu command prompt, type:

    sudo -u postgres createdb Umass-Books
    psql Umass-Books < UMass-BookShare/bookapp/schema/UmassProjectScema.sql


### Installing Node.js and Express:

Install Node.js from http://nodejs.org

To install dependencies, navigate to bookapp directory and run:

    sudo npm install

### Running the App:

To run the app, use this command:

npm start

In the browser, type <strong>localhost:3000</strong> in address bar.
