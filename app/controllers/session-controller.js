let session_exports = {};

session_exports.signin = function(req, res) {
	res.render('signin');
}


session_exports.logout = function(req, res) {
  req.session.destroy(function (err) {
  res.redirect('/');
  });
}

module.exports = session_exports;
