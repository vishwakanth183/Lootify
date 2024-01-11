const express = require('express');
const app = express();
require('dotenv').config();
// const Sequelize = require('sequelize');
const bodyParser = require('body-parser')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const port = 5000;
require('./middleware/passport')
const passport = require('passport')
const db = require("./models");
const userRoute = require('./router/auth.router')
const address = require('./router/address.router')
require("./global_functions.js");
db.sequelize.sync()
    .then(() => {
        console.log("Synced db");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors());
app.use(passport.initialize())
app.use('/auth', userRoute)
app.use('/address', address)
app.listen(port, '0.0.0.0', () => {
    console.log('app is running on ', port)
})
