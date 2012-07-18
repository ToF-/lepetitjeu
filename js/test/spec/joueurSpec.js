describe("un joueur", function() {
	var mediator, joueur, canalJoueur, canalAffichage, message, controleDePosition;

	beforeEach(function() {
		canalJoueur = "joueur";
		canalAffichage = "display";
		mediator = new Mediator();
		mediator.Subscribe(canalAffichage, function(data){ message = data });
		controleDePosition = function(messageEnvoye) {message = messageEnvoye;};
  	});

  	var construitPosition = function (coordonnees){
  		return new Position({x: coordonnees[0], y: coordonnees[1]});
  	}

  	var verifiePosition = function(expectPosition, actualPosition){
		expect(expectPosition.isEqual(actualPosition)).toBe(true);
  	}

  	var verifiePositionInitiale = function(coordonnees){
  		var position = construitPosition(coordonnees);
  		joueur = new Joueur(mediator, canalJoueur, canalAffichage, position);
		expect(message.isEqual(position)).toBe(true);
  	}

	var verifieLeMessage = function(mouvement, coordonnees){
		mediator.Publish(canalJoueur, mouvement)
		var position = construitPosition(coordonnees);
  		expect(message.isEqual(position)).toBe(true);
  	}

  	it("emet sa position lorsqu il s initialise", function() {
  		verifiePositionInitiale([0,0]);
  		verifiePositionInitiale([10,2]);
	});

	it("emet le bon mouvement lorsqu il recoit une action", function() {
		joueur = new Joueur(mediator, canalJoueur, canalAffichage, new Position ({x: 10, y: 5}), controleDePosition);
		
  		verifieLeMessage(LPJ.Actions.haut, [9, 5]);
  		verifieLeMessage(LPJ.Actions.bas, [11, 5]);
  		verifieLeMessage(LPJ.Actions.gauche, [10, 4]);
  		verifieLeMessage(LPJ.Actions.droit, [10, 6]);
	});

	it("actualise sa position lorsqu il en recoit une nouvelle", function() {
		joueur = new Joueur(mediator, canalJoueur, canalAffichage, new Position ({x: 10, y: 5}), controleDePosition);
		joueur.actualisePosition(construitPosition([0,0]));
		verifiePosition(construitPosition([0,0]), joueur.position);
	});

});