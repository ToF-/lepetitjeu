myPlayer = {}
players = []
paper = {}
caseWidth = 30
caseNumber = 21
map = {}

## WebSocket section
socket = io.connect(window.location.href)

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

socket.on 'new', (data) ->
	console.log("new")
	playerToAdd = new Player(data.id, data.color)
	playerToAdd.initialize() 
	players.push(playerToAdd)

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
	players = players.filter( (element) -> (element.id isnt id))

## Gameplay section	
	
key =
	left: 37
	up: 38
	right: 39
	down: 40
	space: 32

Player = (id, color) ->
	@id = id
	@color = color
	@coordinate = new Coordinate({x:0, y:0})
	@drawing = {}

	@updateDrawing = () ->
		@drawing.attr('cx', @coordinate.x*caseWidth + caseWidth/2) 
		@drawing.attr('cy', @coordinate.y*caseWidth + caseWidth/2) 	
		return @

	@initialize = () ->
		##Creates circle at x = 50, y = 40, with radius 10
		circle = paper.circle(@coordinate.x*caseWidth + caseWidth/2, @coordinate.y*caseWidth + caseWidth/2 , caseWidth/2-2)
		## Sets the fill attribute of the circle to red (#f00)
		circle.attr("fill", @color)
		circle.attr("stroke", "#333")
		@drawing = circle

	return @
	
Coordinate = (obj) ->
	@x = obj.x
	@y = obj.y
	@areEqual = (coordinate) ->
		@x is coordinate.x and @y is coordinate.y
	return @

manageKB = (k)->
	tempCoordinate = new Coordinate(myPlayer.coordinate)

	if k.which is key.space
		dropBomb()
	else
		switch k.which
			when key.left then tempCoordinate.x -= 1
			when key.up then tempCoordinate.y -= 1
			when key.right then tempCoordinate.x += 1
			when key.down then  tempCoordinate.y += 1 
			when key.space then dropBomb()
			else console.log('nop ' + k.which)

		tempCoordinate.x = 0 if tempCoordinate.x < 0
		tempCoordinate.x = (caseNumber - 1) if tempCoordinate.x > (caseNumber - 1)
		tempCoordinate.y = 0 if tempCoordinate.y < 0
		tempCoordinate.y = (caseNumber - 1) if tempCoordinate.y > (caseNumber - 1)


		console.log(map[tempCoordinate.x][tempCoordinate.y], tempCoordinate.x, tempCoordinate.y)
		if (players.filter((element)-> element.id isnt myPlayer.id and element.coordinate.areEqual(tempCoordinate))).length is 0 and map[tempCoordinate.x][tempCoordinate.y] is 0
			myPlayer.coordinate = tempCoordinate
			myPlayer.updateDrawing()
		else
			console.log 'colision'
		tell()

tell = ()->
	socket.emit('move', {coordinate: myPlayer.coordinate, id: myPlayer.id, color: myPlayer.color})

dropBomb = () ->
	console.log('dropBomb')
	socket.emit('dropBomb', {coordinate: myPlayer.coordinate})

preparePlayground = (map) ->
	drawCase = (x, y, color) ->
		paperCase = paper.rect(x * caseWidth, y * caseWidth, caseWidth, caseWidth)
		if(color)
			paperCase.attr('fill','#888')
		else
			paperCase.attr('fill','#eee')
		paperCase.attr("stroke", "#fff")

	console.log("start")
	y=0
	for row in map by 1
		x=0
		for item in row by 1			
			color = if item == 1 then true else false
			console.log(x, y, color)
			drawCase(x, y, color)
			x++
		y++


Bomb = (coord) ->
	paper.rect(coord.x * caseWidth, coord.y * caseWidth, caseWidth, caseWidth, 10).attr("fill", "#f00");

$ ->
	## Creates canvas 300 × 300 at 10, 50
	paper = Raphael(10, 50, caseWidth * caseNumber, caseWidth * caseNumber)
	socket.emit 'new'
	$(document).keydown(manageKB)