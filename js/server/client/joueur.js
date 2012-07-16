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
      this.gereLesMouvements = __bind(this.gereLesMouvements, this);
      this.mediator.Publish(this.displayChannel, this.position);
      this.mediator.Subscribe(this.playerChannel, this.gereLesMouvements);
    }

    Joueur.prototype.gereLesMouvements = function(mouvement) {
      var positionTemp;
      positionTemp = new Position(this.position);
      switch (mouvement) {
        case LPJ.Mouvements.gauche:
          positionTemp.y -= 1;
          break;
        case LPJ.Mouvements.haut:
          positionTemp.x -= 1;
          break;
        case LPJ.Mouvements.droit:
          positionTemp.y += 1;
          break;
        case LPJ.Mouvements.bas:
          positionTemp.x += 1;
          break;
        case LPJ.Mouvements.bombe:
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
