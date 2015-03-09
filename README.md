# UMass-Bookshare

### Installing postgresql:

Install postgres, and git:
```sh
    sudo apt-get update
    sudo apt-get install postgresql postgresql-contrib
    sudo apt-get install git
```sh
Navigate to the folder you want to install the server in and run:
```sh
    git clone https://github.com/WDoan/UMass-Bookshare.git
```sh

Change your postgres password and create the database:
```sh
    sudo -u postgres psql postgres
    \password postgres
```sh
Enter password with postgres
Press ctrl-d to exit

In ubuntu command prompt, type:
```sh
    sudo -u postgres createdb Umass-Books
    psql Umass-Books < UMass-BookShare/bookapp/schema/UmassProjectScema.sql
```sh


### Installing Node.js and Express:

Install Node.js from http://nodejs.org

To install dependencies, navigate to bookapp directory and run:
```sh
    sudo npm install
```sh

### Running the App:

```sh
npm start
```sh

In the browser, type localhost:3000 in address bar.
