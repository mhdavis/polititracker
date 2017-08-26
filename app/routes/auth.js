const authController = require('../controllers/auth-controller.js');

module.exports = function(app, passport) {
    app.get('/signup', authController.signup);

    app.get('/', authController.signin);

    app.post('/signup', passport.authenticate('local-signup', {
      successRedirect: "/profile",
      failureRedirct: "/signup"
    }));

    app.get('/profile', isLoggedIn, authController.profile);

    app.get('/logout', authController.logout);

    app.post('/', passport.authenticate('local-signin', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));

    function isLoggedIn (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect('/');
    }
}
