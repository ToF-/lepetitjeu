class @Plateau
	constructor: (@dimension) ->
		@positionOccupees = []

	laCaseEstDisponible: (position) =>
		 @laCaseEstDansLePlateau(position) and @laCaseEstLibre(position)

	laCaseEstLibre: (position) =>
		!(@positionOccupees.some (occupee) -> occupee.isEqual(position))

	laCaseEstDansLePlateau: (position) =>
		!(position.x < 0 or position.y < 0 or position.x >= @dimension or position.y >= @dimension)