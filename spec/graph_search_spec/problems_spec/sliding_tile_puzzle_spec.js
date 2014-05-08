define(['graph_search/problems/sliding_tile_puzzle'], function(SlidingTilePuzzle){
  describe("SlidingTilePuzzle", function(){
    var puzzle;

    function statesAreEqual(state1, state2){
      return (state1.join(',') === state2.join(','));
    }

    beforeEach(function(){
      puzzle = new SlidingTilePuzzle(3, null);
    });

    describe(".goalReached(state)", function(){
      it("should be true when all the numbers are in order", function(){
        expect(puzzle.goalReached([1, 2, 3,
                                   4, 5, 6,
                                   7, 8, null])).toBe(true);
      });

      it("should be false for non-solved states", function(){
        expect(puzzle.goalReached([2,1,3,
                                   4,5,6,
                                   7,8,null])).toBe(false);
      });

      it("should be true for the default initial state", function(){
        expect(puzzle.goalReached(puzzle.initialState)).toBe(true);
      });
    });

    describe(".shuffle()", function(){
      it("should (usually) change the initial state", function(){
        var state1 = puzzle.initialState,
            state2;
        puzzle.shuffle();
        state2 = puzzle.initialState;
        expect(statesAreEqual(state1, state2)).toBe(false);
      });
    });

    describe(".possibleActions(state)", function(){
      it("should return the correct actions", function(){
        var actions = puzzle.possibleActions([1,2,3,
                                              4,5,6,
                                              7,8,null]);
        expect(actions.sort().join(',')).toEqual("down,right");

        actions = puzzle.possibleActions([null,2,3,
                                             4,5,6,
                                             7,8,1]);
        expect(actions.sort().join(',')).toEqual("left,up");

        actions = puzzle.possibleActions([1,  2,  3,
                                          4, null,6,
                                          7,  8,  5]);
        expect(actions.sort().join(',')).toEqual("down,left,right,up");
      });
    });

    describe(".result(state, action)", function(){
      it("should return the correct result", function(){
        var result = puzzle.result([1,2,3,
                                    4,5,6,
                                    7,8,null], "down"),
            expected = [1,2,3,
                        4,5,null,
                        7,8,6];
        expect(statesAreEqual(result, expected)).toBe(true);

        result = puzzle.result([1,2,3,
                                4,5,6,
                                7,8,null], "right");
        expected = [1,2,3,
                    4,5,6,
                    7,null,8];
        expect(statesAreEqual(result, expected)).toBe(true);

        result = puzzle.result([1, 2,  3,
                                4,null,5,
                                6, 7,  8], "up");
        expected = [1,2,3,
                    4,7,5,
                    6,null,8];
        expect(statesAreEqual(result, expected)).toBe(true);

        result = puzzle.result([1, 2,  3,
                                4,null,5,
                                6, 7,  8], "down");
        expected = [1,null,3,
                    4,  2, 5,
                    6,  7, 8];
        expect(statesAreEqual(result, expected)).toBe(true);
      });
    });

    describe(".goalDistanceHeuristic(state)", function(){
      it("should return the correct result", function(){
        expect(puzzle.goalDistanceHeuristic([1,2,3,
                                             4,5,6,
                                             7,8,null])).toEqual(0);

        expect(puzzle.goalDistanceHeuristic([1,2,3,
                                             4,5,6,
                                             8,7,null])).toEqual(2);

        expect(puzzle.goalDistanceHeuristic([6,2,3,
                                             4,5,1,
                                             8,null,7])).toEqual(9);
      });
    });
  });
});
