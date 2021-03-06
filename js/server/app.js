(function() {
  var app, express, id, io;

  express = require("express");

  app = express.createServer();

  /*
  mapBuilder = () ->
    map = []
    k = 0
    mapSize = 21
    
    console.log("starts mapBuilder")
    while k < mapSize
      m=0
      map[k] = []
      while m < mapSize
        map[k][m] = 0
        m++
      k++
    
    i = 1
    while i < mapSize
      j = 1
  
      while j < mapSize
        map[i][j] = 1
        j = j + 2
      i = i + 2
  
    console.log("ends mapBuilder")  
    return map
  
  map = mapBuilder()
  */

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

  /* page de test a virer plus tard
  */

  app.get("/testNetwork", function(req, res) {
    return res.sendfile(__dirname + "/client/network.html");
  });

  app.listen(666);

  io = require("socket.io").listen(app);

  console.log("socket.io is listening on http://127.0.0.1:666/");

  id = 0;

  io.sockets.on("connection", function(socket) {
    var ip;
    console.log("new");
    id++;
    ip = socket.handshake.address.address;
    socket.emit("new", {
      ip: ip
    });
    return socket.on("disconnect", function() {
      console.log("disconnect");
      return socket.get('id', function(err, id) {
        return socket.broadcast.emit("disconnect", id);
      });
    });
  });

}).call(this);
