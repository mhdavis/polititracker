const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");

// Express App
// =============================================================
let app = express();
let PORT = process.env.PORT || 8080;

// Require Sequelize Models for Sync
// =============================================================
let db = require("./app/models");

// Body-Parser Setup
// =============================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extend: true } ));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static HTML Pages
// =============================================================
app.use(express.static('app/public'));

// Set Handlebars
// =============================================================
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Set Routes
// =============================================================
const homeRoutes = require("./app/controllers/home-controller.js");
const userRoutes = require("./app/controllers/users-controller.js");

app.use("/", homeRoutes);
app.use("/user", usersRoutes);

// Sync Sequelize Models then Start Server
// =============================================================
// NOTE: force: true object overwrites server data
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
