class @Joueur

	constructor: (@mediator, @playerChannel, @displayChannel, @position, @controlePosition) ->
		@mediator.Publish @displayChannel, @position
		@mediator.Subscribe @playerChannel, @gereLesMouvements

	gereLesMouvements : (mouvement) =>
		positionTemp = new Position(@position)

		switch mouvement
			when LPJ.Mouvements.gauche then positionTemp.y -= 1
			when LPJ.Mouvements.haut then positionTemp.x -= 1
			when LPJ.Mouvements.droit then positionTemp.y += 1
			when LPJ.Mouvements.bas then positionTemp.x += 1
			when LPJ.Mouvements.bombe then

		if @controlePosition(positionTemp)
			@position = positionTemp
			@publieLaPosition()

	publieLaPosition : () => 
		@mediator.Publish @displayChannel, @position
