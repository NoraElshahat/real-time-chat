$(document).ready(function () {
  var sock = io.connect('http://localhost:5000');
  var msg = $('#message');
  var submit_msg = $('#send_msg');
  var msg_container = $('#msg_container');
  var typing = $('#typing');
  var username = $('#username');

  submit_msg.click((e) => {
    e.preventDefault();
    sock.emit('new_msg', { message: msg.val(), username: username.val() });
  });

  sock.on('new_msg', (data) => {
    msg.val('');
    msg_container.append('<p>' + data.username + ' : ' + data.message + '</p>');
  });

  //   msg.bind('keypress', () => {
  //     sock.emit('typing');
  //   });

  sock.on('typing', (data) => {
    typing.html(
      '<p><i>' + data.username + ' is typing a message...' + '</i></p>'
    );
  });
});
