(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.Joueur = (function() {

    function Joueur(mediator, playerChannel, displayChannel, position, controlePosition) {
      this.mediator = mediator;
      this.playerChannel = playerChannel;
      this.displayChannel = displayChannel;
      this.position = position;
      this.controlePosition = controlePosition;
      this.publieLaPosition = __bind(this.publieLaPosition, this);
      this.gererLesActions = __bind(this.gererLesActions, this);
      this.mediator.Publish(this.displayChannel, this.position);
      this.mediator.Subscribe(this.playerChannel, this.gererLesActions);
    }

    Joueur.prototype.gererLesActions = function(mouvement) {
      var positionTemp;
      positionTemp = new Position(this.position);
      switch (mouvement) {
        case LPJ.Actions.gauche:
          positionTemp.y -= 1;
          break;
        case LPJ.Actions.haut:
          positionTemp.x -= 1;
          break;
        case LPJ.Actions.droit:
          positionTemp.y += 1;
          break;
        case LPJ.Actions.bas:
          positionTemp.x += 1;
          break;
        case LPJ.Actions.bombe:
      }
      if (this.controlePosition(positionTemp)) {
        this.position = positionTemp;
        return this.publieLaPosition();
      }
    };

    Joueur.prototype.publieLaPosition = function() {
      return this.mediator.Publish(this.displayChannel, this.position);
    };

    return Joueur;

  })();

}).call(this);
