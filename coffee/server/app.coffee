express = require("express")
app = express.createServer()
io = require("socket.io").listen(app)

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

app.configure ->
  app.use express.static(__dirname + "/client")
  app.use express.errorHandler(
    dumpExceptions: true
    showStack: true
  )

app.get "/", (req, res) ->
  res.sendfile __dirname + "/client/jeux.html"

app.listen 666

id = 0

io.sockets.on "connection", (socket) ->
  
  socket.on "new", ->
    console.log "new"
    id++ 
    ip = socket.handshake.address.address
    console.log('voici l ip ' + ip)
    f = parseFloat("0." + ip.split('.').reverse().join(''))
    color = '#'+Math.floor(f*16777215).toString(16)
    newPlayer = {id: id, color: color}
    myPlayerContext = {myPlayer: newPlayer, map: map}
    socket.set 'id',id, -> 
      socket.emit "myPlayer", myPlayerContext
      socket.broadcast.emit "new", newPlayer

  socket.on "move", (data) ->
    console.log data
    socket.broadcast.emit "move", data

  socket.on "dropBomb", (data) ->
    console.log data
    socket.broadcast.emit "bombDroped", data
    socket.emit "bombDroped", data

  socket.on "disconnect", ->
    socket.get 'id', (err, id) ->
      socket.broadcast.emit "disconnect", id
