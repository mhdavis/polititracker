const authController = require('../controllers/auth-controller.js');

module.exports = function(app, passport) {
    app.get('/signup', authController.signup);
    app.get('/', authController.signin);
    app.post('/signup', passport.authenticate('local-signup', {
      successRedirect: "/profile",
      failureRedirct: "/signup"
    }));
}
