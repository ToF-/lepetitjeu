## WebSocket section
socket = io.connect(window.location.host)

socket.on 'new', (data) ->
	console.log(data)

###
socket.on 'move', (data) ->
	playerToMove =  (player for player in players when player.id is data.id)
	## le player est inconnu, on l'ajoute
	if playerToMove.length is 0
		currentPlayer = new Player(data.id, data.color) 
		currentPlayer.initialize() 
		players.push currentPlayer 
	else
		currentPlayer = playerToMove[0]
	currentPlayer.coordinate = new Coordinate(data.coordinate)
	currentPlayer.updateDrawing()

socket.on 'myPlayer', (data) ->
	console.log("myPlayer")
	myPlayer = new Player(data.myPlayer.id, data.myPlayer.color)
	preparePlayground(data.map)
	map=data.map
	myPlayer.initialize()
	players.push myPlayer

socket.on 'bombDroped', (data) ->
	console.log 'bombDroped'
	new Bomb(data.coordinate)

socket.on 'disconnect', (id) ->
	playerToErase.drawing.remove() for playerToErase in players.filter( (element) -> (element.id is id));
	players = players.filter( (element) -> (element.id isnt id))###