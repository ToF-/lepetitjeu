describe("un plateau", function() {

  var plateau, mediator, canalComm;

  beforeEach(function() {
    mediator = new Mediator();
    canalComm = "canal";
  });

  var verifieQueLaCaSeEstIndisponible = function(x,y) {
      var position = new Position(x, y)
      expect(plateau.laCaseEstDisponible(position)).toBe(false);
  }

  var constuitLePlateau = function(tailleDuPlateau){
    return plateau = new Plateau(tailleDuPlateau, mediator, canalComm);
  }

  describe("de 1*1", function() {

    beforeEach(function() {
      plateau = constuitLePlateau(1);
    });

  
    it("a sa case disponible lorsqu elle n est pas occupee", function() {
      var position = new Position({x: 0, y: 0})
      expect(plateau.laCaseEstDisponible(position)).toBe(true);
    });

    it("a sa case non disponible lorsqu elle est occupee", function() {
      var position = new Position({x: 0, y: 0})
      var position2 = new Position({x: 0, y: 0})
      plateau.positionOccupees.push(position);
      expect(plateau.laCaseEstDisponible(position2)).toBe(false);
    });

  it("n a pas d autre case disponible que celle en 0,0", function() {
    verifieQueLaCaSeEstIndisponible({x: 1,y: 0});
    verifieQueLaCaSeEstIndisponible({x: 0,y: 1});
    verifieQueLaCaSeEstIndisponible({x: -1,y: 0});
    verifieQueLaCaSeEstIndisponible({x: 0,y: -1});
    });

  });

  describe("un plateau de 2*2", function() {

    beforeEach(function() {
        constuitLePlateau(2);
      });


    it("retient les positions des joueurs", function() {
        mediator.Publish(canalComm, new Position({x: 0, y: 0}));
        verifieQueLaCaSeEstIndisponible({x: 0,y: 0});
    });
  

  });

});


