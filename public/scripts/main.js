
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

  giStatus.connected(true);

  var userList = new goinstant.widgets.UserList({
    room: lobby,
    collapsed: false,
    position: 'right'
  });

  userList.initialize(function(err) {
    if (err) {
      throw err;
    }
  });

  var userColors = new goinstant.widgets.UserColors({ room: lobby });

  userColors.choose(function(err, color) {
    if (err) {
      throw err;
    }
    console.log('The chosen color is ' + color);
  });

  /*jshint unused:false*/ // Remove once you're doing something with lobby!
});
