describe("le keyboard manager", function() {
	var keyboardManager, sauvegardeMessage, messages;

	var enfonceLaTouche = function(numeroDeLaTouche){
		var e = jQuery.Event("keydown");
		e.which = numeroDeLaTouche;
		$(document).trigger(e);
	}

	var verifieLeMessageEmis = function(message, direction){
		enfonceLaTouche(KeyboardManager.touche[direction]);
		expect(message[message.length - 1]).toBe(LPJ.Actions[direction]);
	}

	beforeEach(function() {
		messages = [];
		sauvegardeMessage = function(data){ messages.push(data); };
		keyboardManager = new KeyboardManager(document, sauvegardeMessage);
  	});

  	it("emet le signal correspondant a la touche appuyee", function() {
		verifieLeMessageEmis(messages, "haut");
		verifieLeMessageEmis(messages, "bas");
		verifieLeMessageEmis(messages, "gauche");
		verifieLeMessageEmis(messages, "droit");
		
		enfonceLaTouche(KeyboardManager.touche.espace);
		expect(messages[messages.length - 1]).toBe(LPJ.Actions.bombe);	
	});

});