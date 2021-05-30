const express = require('express');
const socket = require('socket.io');

const app = express();

const server = app.listen(5000, () => {
  console.log('Server Is Ready');
  console.log(`http://localhost:5000`);
});

app.use(express.static('public'));

const io = socket(server);

io.on('connection', function (socket) {
  console.log('connection established');

  // listen to new message
  socket.on('new_msg', (data) => {
    io.sockets.emit('new_msg', {
      message: data.message,
      username: data.username,
    });

    //listen on typing a message
    // socket.on('typing', (data) => {
    //   io.broadcast.emit('typing', { username: socket.username });
    // });
  });
});
