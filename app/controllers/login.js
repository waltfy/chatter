var fs = require('fs')
var jwtSimple = require('jwt-simple');
var secret = null;

exports.setup = function(app) {
  var login = new LoginController();

  app.get('/', login.index);
  app.post('/login', login.login);
};


function createJwtForUser(id, displayname){
	var config = JSON.parse(fs.readFileSync("app/config.txt", "utf8"));
	secret = config['secret'];

	if(secret === undefined || secret === null){
		return;
	}

  var claims = {
    iss: 'Chatter',
    sub: id,
    iat: Math.floor(Date.now()/1000),
    dn: displayname
  };


  return jwtSimple.encode(claims, secret.trim()); // claims automatically JSON encoded
};

function getId(){
  return 0;
}

function LoginController() {
  console.log('login controller initialized');
}

LoginController.prototype.index = function (req, res) {
  res.render('login');
};

LoginController.prototype.login = function (req, res){
	var username = req.body['username'];
	console.log(username);

	jwt = createJwtForUser(getId(), username); 

	//store token as a cookie
	res.cookie('jwt', jwt,{  maxAge: 900000, httpOnly: false});
	res.end();
}
