
/* global goinstant */

'use strict';

/* Dependencies */

var giStatus = require('./gi_status');

var url = 'https://goinstant.net/adamflax/chatter';
var userData;

goinstant.connect(url, function (err, connection, lobby) {
  if (err) {
    giStatus.connected(false);
    console.log('Error connecting to platform:', err);
    return;
  }

  $(document).ready(function(){
      var userKey = lobby.self();
      userKey.get(function(err, value, context){
        if(err) throw err;
        userData = value;
      });
  });

  giStatus.connected(true);

  var userList = new goinstant.widgets.UserList({
    room: lobby,
    collapsed: false,
    position: 'right',
    truncateLength: 24,
    avatars: false,
    userOptions: true
  });

  userList.initialize(function(err) {
    if (err) {
      throw err;
    }
    $( ".gi-collapse" ).remove();
    $(".gi-user").click(function(){
      alert("id: " + $(this).attr("data-goinstant-id") +  " name: " + $(this).attr("title"));
    });
  });

  var userColors = new goinstant.widgets.UserColors({ room: lobby });

  userColors.choose(function(err, color) {
    if (err) {
      throw err;
    }
    console.log('The chosen color is ' + color);
  });

  var name = lobby.key('name'),
      send = $('#send'),
      chatEl = $('.chat'),
      messageEl = $('#message');

  name.on("set", function (value, context) {
    chatEl.html(value);
  });

  send.on('click', function() {
    chatEl.append('<p><small>' + moment().format('h:mm:ss') + '</small> ' + userData.displayName + ' ' + messageEl.val() + '</p>');
    messageEl.val("");
    name.set(chatEl.html());
    messageEl.val("");



  //lets generate a jws token for the user
	if(configData === null){
		console.log("no config found!");
	}

	var key = new Buffer(configData['secret'], 'base64'); // convert to binary

	exports.createJwtForUser = function(user) {
		var claims = {
		  iss: 'Chatter',
		  sub: user.id,
		  iat: Math.floor(Date.now()/1000),
		  dn: user.displayName
		};

		return jwtSimple.encode(claims, key); // claims automatically JSON encoded
	};

  // The listener will be invoked every time the value of name is changed
  // by another user
  name.on('set', function(value, context) {
    el.val(value);
  });

  messageEl.keypress(function (e) {
      if (e.which == 13) {
        send.click();
        return false;
      }
  });

  /*jshint unused:false*/ // Remove once you're doing something with lobby!
});
