const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");

// Passport Imports
// =============================================================
const passport = require('passport');
const session = require('express-session');
const env = require('dotenv').load();

// Express App
// =============================================================
let app = express();
let PORT = process.env.PORT || 8080;

// Require Sequelize Models for Sync
// =============================================================
let db = require("./app/models");

// Body-Parser Setup
// =============================================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport
// =============================================================
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized:true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Static HTML Pages
// =============================================================
app.use(express.static('public'));

// Set Handlebars
// =============================================================
app.engine("handlebars", exphbs(
  { defaultLayout: "main",
    layoutsDir: "./app/views/layouts"
  })
);
app.set('views', './app/views');
app.set("view engine", "handlebars");

// Set Routes
// =============================================================
let authRoutes = require("./app/routes/auth.js")(app, passport);

// Passport Strategies
// =============================================================
require('./app/config/passport/passport.js')(passport, db.User);

// Sync Sequelize Models then Start Server
// =============================================================
// NOTE: force: true object overwrites server data
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
