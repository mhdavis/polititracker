let auth_exports = {};

auth_exports.signin = function(req, res) {
	res.render('signin');
}


auth_exports.logout = function(req, res) {
  req.session.destroy(function (err) {
  res.redirect('/');
  });
}

module.exports = auth_exports;
