const sessionController = require('../controllers/session-controller.js');
const userController = require('../controllers/user-controller.js');

module.exports = function(app, passport) {

    // authController routing (session)
    app.get('/logout', sessionController.logout);

    app.post('/', passport.authenticate('local-signin', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));

    // userController routing
    // signin
    app.get("/", function (req, res) {
      res.render("signin");
    });

    // signup
    app.get("/signup", function (req, res) {
        res.render("signup");
    });

    app.post("/signup", userController.create);

    // profile
    app.get("/profile", userController.show);

    app.put("/profile", userController.update);

}
