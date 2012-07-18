describe("le keyboard manager", function() {
	var keyboardManager, mediator, keyboardChannel;

	var enfonceLaTouche = function(numeroDeLaTouche){
		var e = jQuery.Event("keydown");
		e.which = numeroDeLaTouche;
		$(document).trigger(e);
	}

	var verifieLeMessageEmis = function(message, direction){
		enfonceLaTouche(keyboardManager.touche[direction]);
		expect(message[message.length - 1]).toBe(LPJ.Actions[direction]);
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
		expect(message[message.length - 1]).toBe(LPJ.Actions.bombe);	
	});

});