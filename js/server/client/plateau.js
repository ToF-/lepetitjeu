(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.Plateau = (function() {

    function Plateau(dimension) {
      this.dimension = dimension;
      this.laCaseEstDansLePlateau = __bind(this.laCaseEstDansLePlateau, this);
      this.laCaseEstLibre = __bind(this.laCaseEstLibre, this);
      this.laCaseEstDisponible = __bind(this.laCaseEstDisponible, this);
      this.positionOccupees = [];
    }

    Plateau.prototype.laCaseEstDisponible = function(position) {
      return this.laCaseEstDansLePlateau(position) && this.laCaseEstLibre(position);
    };

    Plateau.prototype.laCaseEstLibre = function(position) {
      return !(this.positionOccupees.some(function(occupee) {
        return occupee.isEqual(position);
      }));
    };

    Plateau.prototype.laCaseEstDansLePlateau = function(position) {
      return !(position.x < 0 || position.y < 0 || position.x >= this.dimension || position.y >= this.dimension);
    };

    return Plateau;

  })();

}).call(this);
