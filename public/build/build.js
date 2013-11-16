;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* Dependencies */

var giStatus = module.exports = {};

giStatus.connected = function(connectionStatus) {
  var statusEl = $('#gi-status');

  switch (connectionStatus) {
    case true:
      statusEl.removeClass('label-danger');
      statusEl.addClass('label-success');
      statusEl.find('.glyphicon').removeClass('glyphicon-thumbs-down');
      statusEl.find('.glyphicon').addClass('glyphicon-thumbs-up');
      break;
    case false:
      statusEl.addClass('label-danger');
      statusEl.removeClass('label-success');
      statusEl.find('.glyphicon').removeClass('glyphicon-thumbs-up');
      statusEl.find('.glyphicon').addClass('glyphicon-thumbs-down');
  }
};
},{}],2:[function(require,module,exports){

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
    chatEl.append('<p><small>' + moment().format('h:mm:ss') + '</small> <b>' + userData.displayName + ':</b> ' + messageEl.val() + '</p>');
    messageEl.val("");
    name.set(chatEl.html());
    messageEl.val("");
  });

  messageEl.keypress(function (e) {
      if (e.which == 13) {
        send.click();
        return false;
      }
  });

  /*jshint unused:false*/ // Remove once you're doing something with lobby!
});

},{"./gi_status":1}]},{},[2])
;