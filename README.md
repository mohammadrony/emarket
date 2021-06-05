# Vue.js + Node.js Web Application with MySQL database
A complete web app with frontend, backend and database. As we all know Vue.js is one of the most popular frontend framework and another framework for backend is node.js which is also well established.
### At first - frontend
In this project I presented many good feature of Vue.js <version 2>. You will find **state management** using multiple modules in the store directory. I've implimented complete **authentication system** (obviously there's a lot in backend for this) with reset password system which means **email automation**. Then I've added **stripe's payment checkout method** which could process different kind of card and currency supported by stripe. You'll have **admin panel** for front end. From the routing pages you'll find details code about how to restrict someone to visit any route and **show a default page for unauthenticated request or any wrong url** entered. You'll find a lots of feature in frontend with **real time update** by not reloading and many more.
### Project overview
In this project I've worked with an e-commerce system. where you might have three level of **category system(category, sub-category, sub-sub-category)**. Then a product with different many different information. You'll have your **cart system** to checkout without login or authentication. You just get your product in cart pay the bill with you card using stripe checkout method and boom you order is placed. but If you login to the system or sign up you can have **wishlist to save product in database** and you can find them later. Then you can **add review, rating to a product** by logging in. Then you can have **banner or some product to shocase in the home page**. You have a custom way to **add a new product** into any category with the details you want. For the **admin panel** you have the **list of all user registered** in your system and you can change their role to give them admin access to all kind of thing. Then you have **order list** with the user information, shipping address and product information. You must checkout the repository to learn more about these topic.
### Last part - backend
Then in backend authentication control was a very big thing. Then express session middleware. JWT authentication. It helped to get data from database. again most of the part of **email automation** happened in backend. then **checkout session generate**. Then **sequelize** orm to work with different type of database. In this case I've used MySQL database. Last but not least **saving media file** from backend and generate public url. 
### To clone this repository
```
git clone https://github.com/mohammadrony/emarket.git
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
