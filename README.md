# vue2-mysql-shop
A Vue js / Express js E-commerce application with MySQL in backend.
### install mysql server on your desktop
```
CREATE DATABASE mydb
``` 
### now clone the repository on your file system
```
git clone https://github.com/mohammadrony29/TopShop.git
```
### check database configuration file for user, password and database
```
cat database/src/config/config.js
```
### install server dependencies 
```
cd TopShop/database && npm install
```
### relative path from database folder
```
cd ../shop && npm install
```
### starting database server first
```
cd ../database && npm start
```
### now all data will synchronize with the shop server properly
```
cd ../shop && npm run serve
```
### now open a browser and go to the link
```
http://localhost:8080
```
# your shop server is live now
