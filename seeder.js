const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const PORT = process.env.PORT || 8080;

require('dotenv').config();

const bodyParser = require("body-parser");
const expressSession = require("express-session");
const mongoose = require('mongoose')
const User = require('./models/User');
app.set("view engine", "ejs");
app.set('layout', './common/main');


const userController = require("./controllers/user");
const recordController = require("./controllers/record");
const bookApiController = require("./controllers/api/stock");


app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(expressLayouts);

const routes = require('./routes/inventory_tracking')
app.use('/', routes)

app.listen(PORT, ()=> console.log(`Listening to port  ${PORT}`));



