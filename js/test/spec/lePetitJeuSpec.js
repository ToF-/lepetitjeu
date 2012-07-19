describe("le petit jeu", function() {
  var petitJeu;

  beforeEach(function() {
      petitJeu = new LePetitJeu();
      petitJeu.go();
  });

  var enfonceLaTouche = function(numeroDeLaTouche){
    var e = jQuery.Event("keydown");
    e.which = numeroDeLaTouche;
    $(document).trigger(e);
  }

  var monJoueurEstLa = function(coordonnees){
    expect(petitJeu.monJoueur.position.isEqual(new Position(coordonnees))).toBe(true)
  }

  it("place mon joueur sur la case 0,0 lorsqu il s initialise", function() {
    monJoueurEstLa([0,0]);
  });

  it("permet a mon joueur de se deplacer le plateau", function() {
    enfonceLaTouche(KeyboardManager.touche.droit);
    monJoueurEstLa([0,1]);

    enfonceLaTouche(KeyboardManager.touche.gauche);
    monJoueurEstLa([0,0]);

    enfonceLaTouche(KeyboardManager.touche.gauche);
    monJoueurEstLa([0,0]);
  });

  it("affiche la position de mon joueur", function() {
    petitJeu = new LePetitJeu();
    spyOn(petitJeu, 'affichage');    
    petitJeu.go();
    expect(petitJeu.affichage.mostRecentCall.args[0].isEqual(new Position([0,0]))).toBe(true);
  });

});
