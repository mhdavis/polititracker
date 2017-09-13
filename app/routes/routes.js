const sessionController = require('../controllers/session-controller.js');
const userController = require('../controllers/user-controller.js');

module.exports = function (app, passport) {

    // ==================================================================
    // AUTH CONTROLLER ROUTING
    // ==================================================================

    app.get('/logout', sessionController.logout);

    app.post('/', passport.authenticate('local-signin', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));

    // ==================================================================
    // USER CONTROLLER ROUTING
    // ==================================================================

    // Signin Routes
    // ===================================================
    app.get("/", function (req, res) {
      res.render("signin");
    });

    // Signup Routes
    // ===================================================
    app.get("/signup", function (req, res) {
        res.render("signup");
    });

    app.post("/signup", userController.create);

    // Profile Routes
    // ===================================================
    app.get("/profile", userController.show);

    app.put("/profile", userController.update);

}
