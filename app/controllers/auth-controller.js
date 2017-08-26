let exportsObj = {};

exportsObj.signup = function(req, res) {
	res.render('signup');
}

exportsObj.signin = function(req, res) {
	res.render('signin');
}

exportsObj.profile = function(req, res) {
	res.render('profile');
}

exportsObj.logout = function(req, res) {
  req.session.destroy(function (err) {
  res.redirect('/');
  });
}

module.exports = exportsObj;
