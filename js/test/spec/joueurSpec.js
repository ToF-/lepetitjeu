describe("un joueur", function() {
	var mediator, joueur, canalJoueur, canalAffichage, message, ecoutePlateau;

	beforeEach(function() {
		canalJoueur = "joueur";
		canalAffichage = "display";
		mediator = new Mediator();
		mediator.Subscribe(canalAffichage, function(data){ message = data });
		ecoutePlateau = function(messageEnvoye) {message = messageEnvoye;};

  	});

  	var verifiePositionInitiale = function(coordonnees){
  		position = new Position({x: coordonnees[0], y: coordonnees[1]});
  		joueur = new Joueur(mediator, canalJoueur, canalAffichage, position);
		expect(message.isEqual(position)).toBe(true);
  	}

	var verifieDeplacement = function(mouvement, coordonnees){
		mediator.Publish(canalJoueur, mouvement)
		position = new Position({x: coordonnees[0], y: coordonnees[1]});
  		expect(message.isEqual(position)).toBe(true);
  	}

  	it("emet sa position lorsqu il s initialise", function() {
  		verifiePositionInitiale([0,0]);
  		verifiePositionInitiale([10,2]);
	});

	it("emmet le bon mouvement lorsqu il recoit une action", function() {
		joueur = new Joueur(mediator, canalJoueur, canalAffichage, new Position ({x: 10, y: 5}), ecoutePlateau);
		
  		verifieDeplacement(LPJ.Actions.haut, [9, 5]);
  		verifieDeplacement(LPJ.Actions.bas, [11, 5]);
  		verifieDeplacement(LPJ.Actions.gauche, [10, 4]);
  		verifieDeplacement(LPJ.Actions.droit, [10, 6]);
	});

});