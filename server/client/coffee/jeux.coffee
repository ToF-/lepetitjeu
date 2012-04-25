myPlayer = {}
players = []
paper = {}
caseWidth = 20
caseNumber = 20

socket = io.connect('http://192.168.2.53:666')
socket.on 'move', (data) ->
	playerToMove =  (player for player in players when player.id is data.id)
	## le player est inconnu, on l'ajoute
	if playerToMove.length is 0
		currentPlayer = new Player(data.id, data.color) 
		currentPlayer.initialize() 
		players.push currentPlayer 
	else
		currentPlayer = playerToMove[0]
	currentPlayer.drawing.attr('cx', data.x)
	currentPlayer.drawing.attr('cy', data.y)

socket.on 'new', (data) ->
	playerToAdd = new Player(data.id, data.color)
	playerToAdd.initialize() 
	players.push  playerToAdd

socket.on 'myPlayer', (data) ->
	myPlayer = new Player(data.id, data.color)
	myPlayer.initialize()
	players.push myPlayer

socket.on 'disconnect', (id) ->
	playerToErase.drawing.remove() for playerToErase in players.filter( (element) -> (element.id is id));
	players = players.filter( (element) -> (element.id isnt id))

key =
	left: 37
	up: 38
	right: 39
	down: 40

Player = (id, color) ->
	@id = id
	@color = color
	@x = 0
	@y = 0
	@drawing = {}
	return @
Player.prototype.initialize = () ->
	##Creates circle at x = 50, y = 40, with radius 10
	circle = paper.circle(@x*caseWidth + caseWidth/2, @y*caseWidth + caseWidth/2 , 10)
	## Sets the fill attribute of the circle to red (#f00)
	circle.attr("fill", @color)
	@drawing = circle

manageKB = (k)->
	switch k.which
		when key.left then myPlayer.x -= 1
		when key.up then myPlayer.y -= 1
		when key.right then myPlayer.x += 1
		when key.down then  myPlayer.y += 1 
		else console.log('nop ' + k.which)

	myPlayer.x = 0 if myPlayer.x < 0
	myPlayer.x = (caseNumber - 1) if myPlayer.x > (caseNumber - 1)
	myPlayer.y = 0 if myPlayer.y < 0
	myPlayer.y = (caseNumber - 1) if myPlayer.y > (caseNumber - 1)

	myPlayer.drawing.attr('cx', myPlayer.x*caseWidth + caseWidth/2) 
	myPlayer.drawing.attr('cy', myPlayer.y*caseWidth + caseWidth/2) 	
	tell()

tell = ()->
	socket.emit('move', {x: myPlayer.drawing.attr('cx'), y: myPlayer.drawing.attr('cy'), id: myPlayer.id, color: myPlayer.color})

preparePlayground = () ->
	drawCase = (x, y, color) ->
		paperCase = paper.rect(x * caseWidth, y * caseWidth, caseWidth, caseWidth)
		console.log('case x:' + x + ' y:' + y + 'color: '+ color + 'caseWidth: ' + caseWidth)
		if(color)
			paperCase.attr('fill','#ddd')
		else
			paperCase.attr('fill','#fff')

	color = false
	for y in [0...caseNumber ] by 1
		for x in [0...caseNumber] by 1
			drawCase x, y, color
			color = not color
		color = not color

$ ->
	## Creates canvas 300 × 300 at 10, 50
	paper = Raphael(10, 50, caseWidth * caseNumber, caseWidth * caseNumber)
	preparePlayground()
	socket.emit 'new'
	$(document).keydown(manageKB)