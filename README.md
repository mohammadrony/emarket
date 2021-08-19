# Vue.js + Node.js Web Application with MySQL database
## Project Overview
A complete web app with frontend, backend and database. In this project i've used Vue.js framework for the frontend and express.js framework for the backend on node.js app and MySQL database. If you directly want to start from setting up this project start from [here](https://github.com/mohammadrony/emarket#project-setup).
### Project UI overview
#### For User without Logging in
In this project I've worked with an e-commerce system where you will find three level of **category system(category, sub-category, sub-sub-category)**. And some product with many different information in that category. You can also **search for products** with keyword and price range in a category. You can see other customer review for those product also. Then you can add as many product in cart for checkout. To checkout with your product in cart you need to pass shipping information and some contact information to move on. then you have to pay the bill with your card using **stripe checkout method** and your order will be placed. To check your order at any time a **link will be sent to the email address** you provided with your contact information. At home screen there are some **promotion of product** is also available.
#### For User with Logging in
***\*Including previous feature***. By logging in to the system or by signing up you can have **wishlist to save product in database** and you can find them later. and you can **add review, rating to a product**. By sending verification code this system is also could help you **reset you password** if you forget. This web app also include a **user profile**. You need to verify your email to create your account.
#### For Admin User
***\*Including previous feature***. As admin you have a custom way to **create/delete a product** from any category. Also you can **create/edit/delete a category** there. You can also **delete** any other customer's review from a product. Now for the **admin panel** you have the **list of all registered user** in your system and you can change their role to give them admin access. Then you have **order list** with the user's contact information, shipping address and product information.
### Programming Overview
#### Frontend Description
In this project I presented many good feature of Vue.js <version 2>. You will find **state management** using multiple modules in the store directory. For the front end there's **authentication flow** (obviously there's a lot in backend for this) with reset password feature which includes **email automation**. Then I've added **stripe's payment method** which could process different kind of card and currency supported by stripe. Then from the routing pages you'll find details code about how to restrict someone to visit any route and **show a default page for unauthenticated request or any wrong url** entered. You'll find a lots of feature with **real time update** by not reloading the page and many more. 
#### Backend Description
RESTful Api, authentication management is two most important part of the backend. Then session middleware, JWT authentication, those helped to get data from database securely. again most of the part of **email automation** happened in backend. then **payment session generate**. Then **sequelize** orm to work with different type of database. I've worked with MySQL database here. Then **saving media file** and generate public url. You must checkout the repository to learn more about these topic. I tried to keep the project organized. It might help you a lot. If you still have any question I've given my email at the end of the instruction.
### Topics included in project
#### Frontend
[Vue js](https://vuejs.org/)\
[State management - Vuex](https://vuex.vuejs.org/)\
[Vue routing](https://vuejs.org/v2/guide/routing.html)\
[Component design - Bootstrap Vue](https://bootstrap-vue.org/)\
[Payment gateway - Stripe](https://stripe.com/)
#### Backend
[Node js](https://nodejs.org/en/)\
[Express js](http://expressjs.com/)\
[RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer)\
[Authentication - Passport js](http://www.passportjs.org/)\
[Mail automation - Nodemailer](https://nodemailer.com/about/)\
[Database interfacing - Sequelize](https://sequelize.org/)
#### Database
[MySQL](https://www.mysql.com/)
#### Some Followed Tutorial
[YouTube -  The Earth Is Square - Learn Vue 3 for Beginners](https://www.youtube.com/watch?v=ZqgiuPt5QZo)\
[YouTube -  Program With Erik - BootstrapVue introduction](https://www.youtube.com/watch?v=-DyKeMa5tYY&list=PL-lxoPS_1OXWb4BlDuSsUrkq66hM5pG33)\
[YouTube - freeCodeCamp.org - Backend frontend combining](https://www.youtube.com/watch?v=Fa4cRMaTDUI&list=PLWKjhJtqVAbnadueQ-C5keMQQiQau_i0D)\
[YouTube -  Stripe Developers - Stripe Checkout](https://www.youtube.com/watch?v=UjcSWxPNo18)\
[YouTube - Academind - Uploading an Image](https://www.youtube.com/watch?v=srPXMt1Q0nY)\
[YouTube - Esterling Accime - Send Email with Node.js](https://www.youtube.com/watch?v=Va9UKGs1bwI)
## Project Setup
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
### Configure MySQL Server
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
Run this command `mysql -p` in terminal to get mysql command prompt. Then run
```
CREATE DATABASE mydb
```
### Environment variable setup
Now rename `.env2` file in `server` directory to `.env` to setup email automation and to pay with stripe. Now get stripe public key (named as publishable key) and secret key for `server/.env` file from your stripe account and find stripe public key and secret key from https://dashboard.stripe.com/test/apikeys. To send email from google account using program you need to turn on **allow less secure apps** for you gmail from https://myaccount.google.com/lesssecureapps. And now enter your google account email address and account password. If you don't want to use gmail account you need to configure the transporter for sending email in controller files in `server/src/controllers/*`. We do not publish .env file to public github repository. You can check `.gitignore` file in top of the directory. These secret information will only save to your device. this is the outlook of `.env` file in `server` directory.
```
STRIPE_SECRET_KEY=sk_test_qwertyuiopzxcvbnmasdfghjkl
STRIPE_PUBLIC_KEY=pk_test_qwertyuiopasdfghjklzxcvbnm
ESTORE_EMAIL=youremail@gmail.com
ESTORE_PASSWORD=email_password
```
Also you need to update stripe public key in `shop/src/components/Checkout/BuyItem.vue`.
### Check and match database configuration for user, password and database information
```
server/src/config/config.js
```
### Feed some data to database for the website
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
### Then your application should be running at port 8080 locally
goto http://localhost:8080
### You can contact with me if you face any problem.
My email `ronyku1829@gmail.com`\
Thank you.
