(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.Joueur = (function() {

    function Joueur(affiche, position, controlePosition) {
      this.affiche = affiche;
      this.position = position;
      this.controlePosition = controlePosition;
      this.actualisePosition = __bind(this.actualisePosition, this);
      this.gererLesActions = __bind(this.gererLesActions, this);
      this.affiche(this.position);
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
      return this.controlePosition(positionTemp);
    };

    Joueur.prototype.actualisePosition = function(position) {
      this.position = position;
      return this.affiche(this.position);
    };

    return Joueur;

  })();

}).call(this);
