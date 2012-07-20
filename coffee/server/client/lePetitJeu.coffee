class @LePetitJeu
	constructor: () ->
		@plateau = new Plateau(10)

	controlePosition: (position) =>
		if (@plateau.laCaseEstDisponible position)
			@monJoueur.actualisePosition(position)

	affichage: (message) =>
		console.log(message)

	go: () =>
		@monJoueur = new Joueur(@affichage, new Position([0, 0]), @controlePosition);
		new KeyboardManager(document, @monJoueur.gererLesActions)

