define(['underscore', 'discrete_local_search/problems/queens'], function(_, Queens){
  describe("Queens", function(){
    var puzzle;

    function statesAreEqual(state1, state2){
      return (state1.join(',') === state2.join(','));
    }

    function containsState(states, state){
      var found = false;
      _.each(states, function(candidateState){ //TODO can you break from an underscore loop?
        if (!found && statesAreEqual(state, candidateState)){
          found = true;
        }
      });
      return found;
    }

    beforeEach(function(){
      puzzle = new Queens({size: 3});
    });

    describe(".randState()", function(){
      it("should be a valid state", function(){
        var state = puzzle.randState();

        expect(state.length).toEqual(3);

        expect(state[0] >= 0).toBe(true); //TODO
        expect(state[0] <= 2).toBe(true); //TODO

        expect(state[1] >= 0).toBe(true); //TODO
        expect(state[1] <= 2).toBe(true); //TODO

        expect(state[2] >= 0).toBe(true); //TODO
        expect(state[2] <= 2).toBe(true); //TODO
      });
    });

    describe(".neighbouringStates(state)", function(){
      it("should return the correct states", function(){
        var state = [0, 1, 2];
        var neighbouringStates = puzzle.neighbouringStates(state);

        expect(neighbouringStates.length).toEqual(6);

        expect(containsState(neighbouringStates, [1, 1, 2])).toBe(true);
        expect(containsState(neighbouringStates, [2, 1, 2])).toBe(true);
        expect(containsState(neighbouringStates, [0, 0, 2])).toBe(true);
        expect(containsState(neighbouringStates, [0, 2, 2])).toBe(true);
        expect(containsState(neighbouringStates, [0, 1, 0])).toBe(true);
        expect(containsState(neighbouringStates, [0, 1, 1])).toBe(true);
      });
    });

    describe(".objectiveFunction(state)", function(){
      it("should return the correct value", function(){

        expect(puzzle.objectiveFunction([0, 2, 2])).toEqual(-2);
        expect(puzzle.objectiveFunction([2, 2, 2])).toEqual(-3);
        expect(puzzle.objectiveFunction([0, 1, 2])).toEqual(-3);
      });
    });
  });
});
