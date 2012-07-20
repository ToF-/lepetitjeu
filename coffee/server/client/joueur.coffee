class @Joueur

	constructor: (@affiche, @position, @controlePosition) ->
		@affiche @position

	gererLesActions : (mouvement) =>
		positionTemp = new Position(@position)

		switch mouvement
			when LPJ.Actions.gauche then positionTemp.y -= 1
			when LPJ.Actions.haut then positionTemp.x -= 1
			when LPJ.Actions.droit then positionTemp.y += 1
			when LPJ.Actions.bas then positionTemp.x += 1
			when LPJ.Actions.bombe then

		@controlePosition positionTemp

	actualisePosition: (position) =>
		@position = position
		@affiche @position