# Vue.js + Node.js Web Application with MySQL database
### To clone this repository
```
git clone https://github.com/mohammadrony/emarket-bd.git
```
### Install server dependencies - backend
```
cd server && npm install
```
### Install shop dependencies - frontend
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
You could use mysql server password as `12345678`. If you use any other password, You need to change the password in `server/src/config/config.js` file.
you can follow this https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04 to configure mysql database server. 
### Create a mysql database named mydb
```
CREATE DATABASE mydb
``` 
Now rename `.env_for_github` file in `server` directory to `.env` for sending email and payment with stripe. To get stripe public key (named as publishable key) and secret key for `server/.env` file create a stripe account and find stripe public key and secret key from https://dashboard.stripe.com/test/apikeys. To send email from google account using program you need to turn on **allow less secure apps** from https://myaccount.google.com/lesssecureapps. And now enter your google account email address and account password. If you don't want to use gmail account you need to configure the transporter for sending email in controller files in `server/src/controllers/*`. We do not publish .env file to public github repository. You can check .gitignore file in top of the directory. These secret information will only save to your device. this is the outlook of `.env` file in `server` directory.
```
STRIPE_SECRET_KEY=sk_test_qwertyuiopzxcvbnmasdfghjkl
STRIPE_PUBLIC_KEY=pk_test_qwertyuiopasdfghjklzxcvbnm
ESTORE_EMAIL=youremail@gmail.com
ESTORE_PASSWORD=email_password
```
Also you need to update stripe public key in `shop/src/components/Checkout/BuyItem.vue`.
### Re-check database configuration file for user, password and database
```
server/src/config/config.js
```
### Feed some data for the website
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
### Now your application is running locally
```
http://localhost:8080
```
### You can contact with me if you still face any problem
at `ronyku1829@gmail.com`
