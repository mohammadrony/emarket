console.log("server started")
if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config({path: "./.env"})
}
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
// var async = require('async') 		// do not use anywhere
const crypto = require("crypto")	// do not use anywhere
const config = require("./config/config")
const { sequelize } = require("./models")
const app = express();
// app.use(async);
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());
// app.set('view engine', 'ejs')
app.use('/public', express.static('public'));

require('./passport')
require("./routes")(app)
sequelize.sync({ force: false })
	.then(() => {
		app.listen(config.port, () => console.log(`Express server running on port ${config.port}`));
	})
