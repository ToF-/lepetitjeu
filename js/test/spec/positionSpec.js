describe("une position", function(){

	it("se construit a partir d un tableau de coordonnees x,y", function(){
		var position = new Position([1, 7]);
		expect(position.x).toBe(1);
		expect(position.y).toBe(7);
	});

	it("se construit a partir d une autre position", function(){
		var position = new Position([1, 7]);
		var position2 = new Position(position);
		expect(position2.x).toBe(1);
		expect(position2.y).toBe(7);
	});

});