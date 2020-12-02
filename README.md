# vue2-mysql-shop
A Vue js / Express js E-commerce application with MySQL in backend.
At first install MySQL server in your pc
### now create a database from mysql command prompt
```
CREATE DATABASE mydb
``` 
### now clone the repository on your file system
```
git clone https://github.com/mohammadrony29/Ushop.git
```
### check database configuration file for user, password and database
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
