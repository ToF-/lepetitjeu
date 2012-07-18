class @Joueur

	constructor: (@mediator, @playerChannel, @displayChannel, @position, @controlePosition) ->
		@mediator.Publish @displayChannel, @position
		@mediator.Subscribe @playerChannel, @gererLesActions

	gererLesActions : (mouvement) =>
		positionTemp = new Position(@position)

		switch mouvement
			when LPJ.Actions.gauche then positionTemp.y -= 1
			when LPJ.Actions.haut then positionTemp.x -= 1
			when LPJ.Actions.droit then positionTemp.y += 1
			when LPJ.Actions.bas then positionTemp.x += 1
			when LPJ.Actions.bombe then

		if @controlePosition(positionTemp)
			@position = positionTemp
			@publieLaPosition()

	publieLaPosition : () => 
		@mediator.Publish @displayChannel, @position
