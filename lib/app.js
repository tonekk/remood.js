var express = require('express'),
    http = require('http'),
    socketIO = require('socket.io'),
    RemoodConnection = require('./remood.connection');

module.exports = function(app, options) {
  var server = http.createServer(app),
      io = socketIO(server);

  app.use(express.static(__dirname + '/../dist/assets'));

  app.use(function noop(req, res, next) {
    next();
  });

  io.on('connection', function(socket) {

    console.log('Incomming connection, shaking hands:');

    // Handshake
    socket.on('remood-auth', function(msg) {

      var createConnection = function(id) {
        var con = new RemoodConnection(socket, msg.type, id);
        console.log('+ Created new connection with id:', con.id());
        socket.emit('remood-auth', { id: con.id() });
      };

      console.log('+ Socket is a ' + msg.type);

      if (msg.id) {
        con = RemoodConnection.find(msg.id);
        if (con) {
          con.setSocketForType(socket, msg.type);
          console.log('+ Successfully connected to connection with id:', msg.id);
          console.log(con.statusString(true));
        } else {
          console.log('- No conection found for given id, creating new one');
          createConnection(msg.id);
        }
      } else {
        createConnection();
      }
    });

    socket.emit('remood-auth');
  });

  return server;
};
