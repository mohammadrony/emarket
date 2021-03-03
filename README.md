# vue2-mysql-web-store
A Vue js / Express js E-commerce application with MySQL in backend.
At first install MySQL server in your pc
### Create a mysql database named mydb
```
CREATE DATABASE mydb
``` 
### Clone this repository
```
git clone https://github.com/mohammadrony/e-store.git
```
To send email to user and payment with stripe rename `.env_for_github` file in `database` directory to `.env` and set the variable with your data.
```
STRIPE_SECRET_KEY=sk_test_qwertyuiopzxcvbnmasdfghjkl
STRIPE_PUBLIC_KEY=pk_test_qwertyuiopasdfghjklzxcvbnm
ESTORE_EMAIL=youremail@gmail.com
ESTORE_PASSWORD=email_password
```
also update stripe public key in `shop/src/components/Checkout/BuyItem.vue`
notice .gitignore file in top of the directory we do not publish .env file to public github repository.
this secret information will only save to you device.
### Now check database configuration file for user, password and database
```
cat database/src/config/config.js
```
### install server dependencies 
```
cd database && npm install
```
### relative path from database folder
```
cd ../shop && npm install
```
### starting database server first
```
cd ../database && npm start
```
### in another terminal run the following code
```
cd shop && npm run serve
```
### change the directory in your way. consider it as a hint
```
http://localhost:8080
```
