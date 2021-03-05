# vuejs-nodejs-e-commerce-web-application
A Vue js / Express js E-commerce web application using MySQL database.
## Set this project in your computer
### Clone this repository
```
git clone https://github.com/mohammadrony/e-store.git
```
### install application dependencies for backend
```
cd database && npm install
```
### shop folder relative path from database folder
```
cd ../shop && npm install
```
### Configure MySQL server
```
sudo apt-get install mysql-server
```
Secure the database server
```
sudo mysql_secure_installation
```
I use password `12345678`. If you use any other password, You need to change the password in `database/src/config/config.js` file.
you could follow this https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04 for details database configuration. 
### Create a mysql database named mydb
```
CREATE DATABASE mydb
``` 
Rename `.env_for_github` file in `database` directory to `.env` for sending email and payment with stripe. To fill the field in `database/.env` file please find stripe public key and secret key from your stripe account. and enter your email address and email account password. If you don't want to use gmail account you need to change controller files in `database/src/controllers/` Note that .gitignore file in top of the directory. We do not publish .env file to public github repository. this secret information will only save to you device.
```
STRIPE_SECRET_KEY=sk_test_qwertyuiopzxcvbnmasdfghjkl
STRIPE_PUBLIC_KEY=pk_test_qwertyuiopasdfghjklzxcvbnm
ESTORE_EMAIL=youremail@gmail.com
ESTORE_PASSWORD=email_password
```
also update stripe public key in `shop/src/components/Checkout/BuyItem.vue`
### Now check database configuration file for user, password and database
```
cat database/src/config/config.js
```
### starting database server first
```
cd ../database && npm start
```
### in another terminal run the following code
```
cd shop && npm run serve
```
### Now your application is on
```
http://localhost:8080
```
