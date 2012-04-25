(function() {
  var app, express, id, io;

  express = require("express");

  app = express.createServer();

  io = require("socket.io").listen(app);

  app.configure(function() {
    app.use(express.static(__dirname + "/client"));
    return app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });

  app.get("/", function(req, res) {
    return res.sendfile(__dirname + "/client/jeux.html");
  });

  app.listen(666);

  id = 0;

  io.sockets.on("connection", function(socket) {
    socket.on("new", function() {
      var color, f, ip, newPlayer;
      console.log("new");
      id++;
      ip = socket.handshake.address.address;
      console.log('voici l ip ' + ip);
      f = parseFloat("0." + ip.split('.').reverse().join(''));
      color = '#' + Math.floor(f * 16777215).toString(16);
      newPlayer = {
        id: id,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
      };
      return socket.set('id', id, function() {
        socket.emit("myPlayer", newPlayer);
        return socket.broadcast.emit("new", newPlayer);
      });
    });
    socket.on("move", function(data) {
      console.log(data);
      return socket.broadcast.emit("move", data);
    });
    return socket.on("disconnect", function() {
      return socket.get('id', function(err, id) {
        return socket.broadcast.emit("disconnect", id);
      });
    });
  });

}).call(this);
