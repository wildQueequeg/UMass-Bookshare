Installing postgresql:
    Install postgres, and git:
        sudo apt-get update
        sudo apt-get install postgresql postgresql-contrib
        sudo apt-get install git
    Navigate to the folder you want to install the server in and run:
        git clone https://github.com/WDoan/UMass-Bookshare.git

    Change your postgres password and create the database:
        sudo -u postgres psql postgres
        \password postgres
        Enter password with postgres
        Press ctrl-d to exit

        In ubuntu command prompt, type:
        sudo -u postgres createdb Umass-Books
        psql Umass-Books < UMass-BookShare/bookapp/schema/UmassProjectScema.sql


Installing Node.js and Express:
    Install Node.js from http://nodejs.org

    sudo npm install -g express
    sudo npm install -g express-generator

    To install dependencies, navigate to bookapp directory and run:
	sudo npm install

Running the App:
    npm start

    In the browser, type localhost:3000 in address bar.
