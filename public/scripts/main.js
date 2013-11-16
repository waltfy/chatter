
/* global goinstant */

'use strict';

/* Dependencies */

var giStatus = require('./gi_status');

var url = 'https://goinstant.net/adamflax/chatter';

goinstant.connect(url, function (err, connection, lobby) {
  if (err) {
    giStatus.connected(false);
    console.log('Error connecting to platform:', err);
    return;
  }

  var userKey = lobby.self();

  // Now use that key to retrieve the current users data
  var userData = userKey.get(function(err, value, self) {
    if (err) {
      // could not retrieve user data
      throw err;
    }
    console.log(self);
  });

  giStatus.connected(true);

  var userList = new goinstant.widgets.UserList({
    room: lobby,
    collapsed: false,
    position: 'right',
    truncateLength: 24,
    avatars: false,
    userOptions: false
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
      chatEl = $('#test'),
      messageEl = $('#message');

  name.on("set", function (value, context) {
    messageEl.val(value);
  });

  messageEl.on('keyup', function() {
    name.set($(this).val());
  });

  /*jshint unused:false*/ // Remove once you're doing something with lobby!
});
