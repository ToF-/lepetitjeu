express = require("express")
app = express.createServer()
###
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

map = mapBuilder()###

app.configure ->
  app.use express.static(__dirname + "/client")
  app.use express.errorHandler(
    dumpExceptions: true
    showStack: true
  )

app.get "/", (req, res) ->
  res.sendfile __dirname + "/client/jeux.html"

### page de test a virer plus tard ###
app.get "/testNetwork", (req, res) ->
  res.sendfile __dirname + "/client/network.html"

app.listen 666
io = require("socket.io").listen(app)
console.log "socket.io is listening on http://127.0.0.1:666/"

id = 0

io.sockets.on "connection", (socket) ->
  console.log "new"

  id++ 
  ip = socket.handshake.address.address
  socket.emit "new", {ip: ip}

  socket.on "disconnect", ->
    console.log "disconnect"
    socket.get 'id', (err, id) ->
      socket.broadcast.emit "disconnect", id
