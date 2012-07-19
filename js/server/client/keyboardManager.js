(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.KeyboardManager = (function() {

    KeyboardManager.touche = {
      gauche: 37,
      haut: 38,
      droit: 39,
      bas: 40,
      espace: 32
    };

    function KeyboardManager(document, sortie) {
      this.sortie = sortie;
      this.publie = __bind(this.publie, this);
      this.keyPress = __bind(this.keyPress, this);
      $(document).keydown(this.keyPress);
    }

    KeyboardManager.prototype.keyPress = function(k) {
      switch (k.which) {
        case KeyboardManager.touche.gauche:
          return this.publie(LPJ.Actions.gauche);
        case KeyboardManager.touche.haut:
          return this.publie(LPJ.Actions.haut);
        case KeyboardManager.touche.droit:
          return this.publie(LPJ.Actions.droit);
        case KeyboardManager.touche.bas:
          return this.publie(LPJ.Actions.bas);
        case KeyboardManager.touche.espace:
          return this.publie(LPJ.Actions.bombe);
      }
    };

    KeyboardManager.prototype.publie = function(message) {
      return this.sortie(message);
    };

    return KeyboardManager;

  })();

}).call(this);
