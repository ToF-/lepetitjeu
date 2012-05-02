(function() {
  var app, express, id, io, map, mapBuilder;

  express = require("express");

  app = express.createServer();

  io = require("socket.io").listen(app);

  mapBuilder = function() {
    var i, j, k, map;
    map = [];
    k = 0;
    while (k < 20) {
      map[k] = [];
      k++;
    }
    i = 1;
    while (i < 20) {
      j = 1;
      while (j < 20) {
        map[i][j] = 1;
        j = j + 2;
      }
      i = i + 2;
    }
    return map;
  };

  map = mapBuilder();

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
      var color, f, ip, myPlayerContext, newPlayer;
      console.log("new");
      id++;
      ip = socket.handshake.address.address;
      console.log('voici l ip ' + ip);
      f = parseFloat("0." + ip.split('.').reverse().join(''));
      console.log(f);
      color = '#' + Math.floor(f * 16777215).toString(16);
      newPlayer = {
        id: id,
        color: color
      };
      myPlayerContext = {
        myPlayer: newPlayer,
        map: map
      };
      return socket.set('id', id, function() {
        socket.emit("myPlayer", myPlayerContext);
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
