class @KeyboardManager

	touche :
		gauche: 37
		haut: 38
		droit: 39
		bas: 40
		espace: 32

	constructor: (document, @mediator, @outputChannel) ->
		$(document).keydown @keyPress

	keyPress: (k) =>
		switch k.which
			when @touche.gauche then @publie LPJ.Mouvements.gauche
			when @touche.haut then @publie LPJ.Mouvements.haut
			when @touche.droit then @publie LPJ.Mouvements.droit
			when @touche.bas then  @publie LPJ.Mouvements.bas
			when @touche.espace then @publie LPJ.Mouvements.bombe

	publie : (message) =>
		@mediator.Publish @outputChannel, message