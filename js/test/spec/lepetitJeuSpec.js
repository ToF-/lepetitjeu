describe("le keyboard manager", function() {
	var keyboardManager, mediator, keyboardChannel;

	var enfonceLaTouche = function(numeroDeLaTouche){
		var e = jQuery.Event("keydown");
		e.which = numeroDeLaTouche;
		$(document).trigger(e);
	}

	var verifieLeMessageEmis = function(message, direction){
		enfonceLaTouche(keyboardManager.touche[direction]);
		expect(message[message.length - 1]).toBe(LPJ.Mouvements[direction]);
	}

	beforeEach(function() {
		keyboardChannel = "keyChannel"
		mediator = new Mediator();
		keyboardManager = new KeyboardManager(document, mediator, keyboardChannel);
  	});

  	it("emet le signal correspondant a la touche appuyee", function() {
  		var message = [];
		mediator.Subscribe(keyboardChannel, function(data){ message.push(data) });
		
		verifieLeMessageEmis(message, "haut");
		verifieLeMessageEmis(message, "bas");
		verifieLeMessageEmis(message, "gauche");
		verifieLeMessageEmis(message, "droit");
		
		enfonceLaTouche(keyboardManager.touche.espace);
		expect(message[message.length - 1]).toBe(LPJ.Mouvements.bombe);	
	});

});

describe("un plateau de 1*1", function() {
	var mediator, joueur, canalJoueur, canalAffichage, message, plateau;

	beforeEach(function() {
  		plateau = new Plateau(1);
  	});

  	var verifieQueLaCaSeEstIndisponible = function(x,y) {
  		var position = new Position(x, y)
  		expect(plateau.laCaseEstDisponible(position)).toBe(false);
  	}

  	it("a sa case disponible lorsqu elle n est pas occupee", function() {
  		var position = new Position({x: 0, y: 0})
  		expect(plateau.laCaseEstDisponible(position)).toBe(true);
	});

  	it("a sa case non disponible lorsqu elle est occupee", function() {
  		var position = new Position({x: 0, y: 0})
  		var position2 = new Position({x: 0, y: 0})
  		plateau.positionOccupees.push(position);
  		expect(plateau.laCaseEstDisponible(position2)).toBe(false);
	});

	it("n a pas d autre case disponible que celle en 0,0", function() {
		verifieQueLaCaSeEstIndisponible({x: 1,y: 0});
		verifieQueLaCaSeEstIndisponible({x: 0,y: 1});
		verifieQueLaCaSeEstIndisponible({x: -1,y: 0});
		verifieQueLaCaSeEstIndisponible({x: 0,y: -1});
	});
});

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
		
		verifieDeplacement(LPJ.Mouvements.haut, [9, 5]);
		verifieDeplacement(LPJ.Mouvements.bas, [10, 5]);
		verifieDeplacement(LPJ.Mouvements.gauche, [10, 4]);
		verifieDeplacement(LPJ.Mouvements.droit, [10, 5]);
	});

	it("lorsque le deplacement est interdit, le deplacement est annule", function(){
		joueur = new Joueur(mediator, canalJoueur, canalAffichage, new Position ({x: 10, y: 5}), function(){
			return false;
		});

		verifieDeplacement(LPJ.Mouvements.haut, [10, 5]);
	});

});