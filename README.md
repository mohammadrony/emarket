# Vuejs-nodejs-e-commerce-web-application
A Vue js / Express js E-commerce web application using MySQL database.
### Clone this repository
```
git clone https://github.com/mohammadrony/e-store.git
```
### Server dependencies - backend
```
cd server && npm install
```
### Shop dependencies - frontend
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
I use mysql server password `12345678`. If you use any other password, You need to change the password in `server/src/config/config.js` file.
you can follow this https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04 to configure database. 
### Create a mysql database named mydb
```
CREATE DATABASE mydb
``` 
Now rename `.env_for_github` file in `server` directory to `.env` for sending email and payment with stripe. To fill the field in `server/.env` file please find stripe public key and secret key from your stripe account. and enter your email address and email account password. If you don't want to use gmail account you need to change controller files in `server/src/controllers/` Note that .gitignore file in top of the directory. We do not publish .env file to public github repository. this secret information will only save to you device.
```
STRIPE_SECRET_KEY=sk_test_qwertyuiopzxcvbnmasdfghjkl
STRIPE_PUBLIC_KEY=pk_test_qwertyuiopasdfghjklzxcvbnm
ESTORE_EMAIL=youremail@gmail.com
ESTORE_PASSWORD=email_password
```
also update stripe public key in `shop/src/components/Checkout/BuyItem.vue`
### Check database configuration file for user, password and database
```
cat server/src/config/config.js
```
### Feed some website data
```
cd server && npm run seed
```
### Starting the backend server first
```
cd server && npm start
```
### From another terminal start vue application
```
cd shop && npm run serve
```
### Now your application is on
```
http://localhost:8080
```
