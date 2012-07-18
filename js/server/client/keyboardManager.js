(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.KeyboardManager = (function() {

    KeyboardManager.prototype.touche = {
      gauche: 37,
      haut: 38,
      droit: 39,
      bas: 40,
      espace: 32
    };

    function KeyboardManager(document, mediator, outputChannel) {
      this.mediator = mediator;
      this.outputChannel = outputChannel;
      this.publie = __bind(this.publie, this);
      this.keyPress = __bind(this.keyPress, this);
      $(document).keydown(this.keyPress);
    }

    KeyboardManager.prototype.keyPress = function(k) {
      switch (k.which) {
        case this.touche.gauche:
          return this.publie(LPJ.Actions.gauche);
        case this.touche.haut:
          return this.publie(LPJ.Actions.haut);
        case this.touche.droit:
          return this.publie(LPJ.Actions.droit);
        case this.touche.bas:
          return this.publie(LPJ.Actions.bas);
        case this.touche.espace:
          return this.publie(LPJ.Actions.bombe);
      }
    };

    KeyboardManager.prototype.publie = function(message) {
      return this.mediator.Publish(this.outputChannel, message);
    };

    return KeyboardManager;

  })();

}).call(this);
