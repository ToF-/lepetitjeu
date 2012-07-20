class @Plateau
	constructor: (@dimension) ->
		@positionOccupees = []

	laCaseEstDisponible: (position) =>
		 @laCaseEstDansLePlateau(position) and @laCaseEstInocupee(position)

	laCaseEstInocupee: (position) =>
		!(@positionOccupees.some (occupee) -> occupee.isEqual(position))

	laCaseEstDansLePlateau: (position) =>
		!(position.x < 0 or position.y < 0 or position.x >= @dimension or position.y >= @dimension)

	retiensLaPositionDesJoueurs: (position) =>
		@positionOccupees.push(position)