const express = require('express');
const socket = require('socket.io');
const activeUsers = new Set();

const app = express();

const server = app.listen(5000, () => {
  console.log('Server Is Ready');
  console.log(`http://localhost:5000`);
});

app.use(express.static('public'));

const io = socket(server);

io.on('connection', function (socket) {
  console.log('socket connection');
});

io.on('new user', function (data) {
  io.userId = data;
  activeUsers.add(data);
  io.emit('new user', [...activeUsers]);
});

io.on('disconnect', () => {
  activeUsers.delete(socket.userId);
  io.emit('user disconnected', socket.userId);
});
