console.log("server started")
if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config({path: "./.env"})
}
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const config = require("./config/config")
const { sequelize } = require("./models")
const app = express();
app.use(morgan("combined"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use('/public', express.static('public'));

require('./passport')
require("./routes")(app)

// Catch all for 404
app.use((req, res, next) => {
  res.status(404).send({ error: 'Not found' });
});

// In test environment, export the app without starting the server
if (process.env.NODE_ENV !== 'test') {
  sequelize.authenticate()
    .then(() => {
      app.listen(config.port, () => console.log(`Express server running on port ${config.port}`));
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
}

module.exports = app
