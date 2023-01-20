const express = require("express");
const expressSession = require("express-session");
const cookieParser = require('cookie-parser');
const expressLayouts = require("express-ejs-layouts");
const flash = require('connect-flash');

const app = express();
const PORT = process.env.PORT || 8080;

require('dotenv').config();

app.set("view engine", "ejs");

app.use(cookieParser('AssesmentSecure'));

app.use(expressSession({
    secret: 'Secret',
    cookie: { expires: new Date(253402300000000), secure: true},
    resave:true,
    saveUninitialized: true
}));

app.use("*", async (req, res, next) => {
    global.user = false;
    if (req.session.userID && !global.user) {
      const user = await User.findById(req.session.userID);
      global.user = user;
    } 
    next();
  })
app.use(flash());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(expressLayouts);

app.set('layout', './common/main');
app.set('layout_login', './common/main_login');

const routes = require('./routes/inventory_tracking')
app.use('/', routes)

app.listen(PORT, ()=> console.log(`Listening to port  ${PORT}`));



