describe("un joueur", function() {
	var mediator, joueur, canalJoueur, canalAffichage, message;

	beforeEach(function() {
		canalJoueur = "joueur";
		canalAffichage = "display";
		mediator = new Mediator();
		mediator.Subscribe(canalAffichage, function(data){ message = data });
  	});

  	var verifiePositionInitiale = function(coordonnees){
  		position = new Position({x: coordonnees[0], y: coordonnees[1]});
  		joueur = new Joueur(mediator, canalJoueur, canalAffichage, position);
		expect(message.isEqual(position)).toBe(true);
  	}

	var verifieDeplacement = function(mouvement, coordonnees){
  		position = new Position({x: coordonnees[0], y: coordonnees[1]});
  		mediator.Publish(canalJoueur, mouvement)
		expect(message.isEqual(position)).toBe(true);
  	}

  	it("emet sa position lorsqu il s initialise", function() {
  		verifiePositionInitiale([0,0]);
  		verifiePositionInitiale([10,2]);
	});

	it("se deplace dans la bonne direction lorsqu il recoit un mouvement", function() {
		joueur = new Joueur(mediator, canalJoueur, canalAffichage, new Position ({x: 10, y: 5}), function(){return true;});
		
		verifieDeplacement(LPJ.Actions.haut, [9, 5]);
		verifieDeplacement(LPJ.Actions.bas, [10, 5]);
		verifieDeplacement(LPJ.Actions.gauche, [10, 4]);
		verifieDeplacement(LPJ.Actions.droit, [10, 5]);
	});

	it("ne se deplace pas lorsque son deplacement est interdit, ", function(){
		joueur = new Joueur(mediator, canalJoueur, canalAffichage, new Position ({x: 10, y: 5}), function(){
			return false;
		});
		verifieDeplacement(LPJ.Actions.haut, [10, 5]);
	});

});