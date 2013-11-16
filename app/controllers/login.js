exports.setup = function(app) {
  var login = new LoginController();

  app.get('/', login.index);
};

function LoginController() {
  console.log('login controller initialized');
}

LoginController.prototype.index = function (req, res) {
  res.render('login');
};