express = require("express")
app = express.createServer()
io = require("socket.io").listen(app)

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
    f = parseFloat("0." + ip.split('.').reverse().join('') )
    color = '#'+Math.floor(f*16777215).toString(16)
    newPlayer = {id: id, color: '#'+Math.floor(Math.random()*16777215).toString(16)}
    socket.set 'id',id, -> 
      socket.emit "myPlayer", newPlayer
      socket.broadcast.emit "new", newPlayer

  socket.on "move", (data) ->
    console.log data
    socket.broadcast.emit "move", data

  socket.on "disconnect", ->
    socket.get 'id', (err, id) ->
      socket.broadcast.emit "disconnect", id