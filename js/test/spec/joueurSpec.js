describe("un joueur", function() {
	var joueur, message, sauvgardeMessage;

	beforeEach(function() {
		sauvgardeMessage = function(messageEnvoye) {message = messageEnvoye;};
	});

	var verifiePosition = function(expectPosition, actualPosition){
	expect(expectPosition.isEqual(actualPosition)).toBe(true);
	}

	var verifiePositionInitiale = function(coordonnees){
		var position = new Position(coordonnees);
		joueur = new Joueur(sauvgardeMessage, position, sauvgardeMessage);
		expect(message.isEqual(coordonnees)).toBe(true);
	}

	var verifieLeMessage = function(mouvement, coordonnees){
		joueur.gererLesActions(mouvement)
    var position = new Position(coordonnees);
		expect(message.isEqual(position)).toBe(true);
	}

	it("emet sa position lorsqu il s initialise", function() {
  		verifiePositionInitiale([0,0]);
  		verifiePositionInitiale([10,2]);
	});

	it("transmet le bon mouvement lorsqu il recoit une action", function() {
		joueur = new Joueur( function(){} , new Position ([10, 5]}), sauvgardeMessage);
		
  		verifieLeMessage(LPJ.Actions.haut, [9, 5]);
  		verifieLeMessage(LPJ.Actions.bas, [11, 5]);
  		verifieLeMessage(LPJ.Actions.gauche, [10, 4]);
  		verifieLeMessage(LPJ.Actions.droit, [10, 6]);
	});

	it("actualise sa position lorsqu il en recoit une nouvelle", function() {
		joueur = new Joueur(sauvgardeMessage, new Position ([10, 5]), function(){});
		joueur.actualisePosition(new Position([0,0]));
		verifiePosition(new Position([0,0]), joueur.position);
	});

  it("affiche sa position lorsqu il en recoit une nouvelle", function() {
    joueur = new Joueur(sauvgardeMessage, new Position ([10, 15]), function(){});
    joueur.actualisePosition(new Position([12,16]));
    expect(message.isEqual(new Position([12,16]))).toBe(true);
  });

});