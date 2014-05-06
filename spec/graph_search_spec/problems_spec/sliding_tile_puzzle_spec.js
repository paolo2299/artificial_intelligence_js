define(['graph_search/problems/sliding_tile_puzzle'], function(SlidingTilePuzzle){
  describe("SlidingTilePuzzle", function(){
    var puzzle;

    beforeEach(function(){
      puzzle = new SlidingTilePuzzle(3, null);
    });

    describe(".goalReached(state)", function(){
      it("should be true when all the numbers are in order", function(){
        var state = [1, 2, 3,
                     4, 5, 6,
                     7, 8, null];
        expect(puzzle.goalReached(state)).toBe(true);
      });

      it("should be true for the default initial state", function(){
        expect(puzzle.goalReached(puzzle.initialState)).toBe(true);
      });

      it("should usually be false for the inital state after shuffling", function(){
        puzzle.shuffle();
        expect(puzzle.goalReached(puzzle.initialState)).toBe(false);
      });
    });
  });
});
