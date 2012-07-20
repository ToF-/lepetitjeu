class @KeyboardManager

	@touche :
		gauche: 37
		haut: 38
		droit: 39
		bas: 40
		espace: 32

	constructor: (document, @sortie) ->
		$(document).keydown @keyPress

	keyPress: (k) =>
		switch k.which
			when KeyboardManager.touche.gauche then @publie LPJ.Actions.gauche
			when KeyboardManager.touche.haut then @publie LPJ.Actions.haut
			when KeyboardManager.touche.droit then @publie LPJ.Actions.droit
			when KeyboardManager.touche.bas then  @publie LPJ.Actions.bas
			when KeyboardManager.touche.espace then @publie LPJ.Actions.bombe

	publie : (message) =>
		@sortie message
