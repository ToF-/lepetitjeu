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
			when @touche.gauche then @publie LPJ.Actions.gauche
			when @touche.haut then @publie LPJ.Actions.haut
			when @touche.droit then @publie LPJ.Actions.droit
			when @touche.bas then  @publie LPJ.Actions.bas
			when @touche.espace then @publie LPJ.Actions.bombe

	publie : (message) =>
		@mediator.Publish @outputChannel, message