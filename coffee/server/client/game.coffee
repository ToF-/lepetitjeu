myPlayer = {}
players = []
paper = {}
caseWidth = 30
caseNumber = 21
map = {}

$ ->
	## Creates canvas 300 × 300 at 10, 50
	paper = Raphael(10, 50, caseWidth * caseNumber, caseWidth * caseNumber)
	socket.emit 'new'
	$(document).keydown(manageKB)