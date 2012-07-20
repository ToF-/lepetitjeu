describe("un plateau", function() {

  var plateau;

  var verifieQueLaCaSeEstIndisponible = function(coordonnees) {
      var position = new Position(coordonnees)
      expect(plateau.laCaseEstDisponible(position)).toBe(false);
  }

  describe("de 1*1", function() {

    beforeEach(function() {
      plateau = new Plateau(1);
    });

    it("a sa case disponible lorsqu elle n est pas occupee", function() {
      var position = new Position([0,0])
      expect(plateau.laCaseEstDisponible(position)).toBe(true);
    });

    it("a sa case non disponible lorsqu elle est occupee", function() {
      var position = new Position([0, 0])
      var position2 = new Position([0, 0])
      plateau.positionOccupees.push(position);
      expect(plateau.laCaseEstDisponible(position2)).toBe(false);
    });

    it("n a pas d autre case disponible que celle en 0,0", function() {
      verifieQueLaCaSeEstIndisponible([1,0]);
      verifieQueLaCaSeEstIndisponible([0,1]);
      verifieQueLaCaSeEstIndisponible([-1,0]);
      verifieQueLaCaSeEstIndisponible([0,-1]);
    });

  });

  describe("un plateau de 2*2", function() {

    beforeEach(function() {
        plateau = new Plateau(2);
      });

    it("retient les positions des joueurs", function() {
        plateau.retiensLaPositionDesJoueurs(new Position([0,0]));
        verifieQueLaCaSeEstIndisponible([0,0]);
    });
  

  });

});


