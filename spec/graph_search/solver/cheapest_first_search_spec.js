define(['graph_search/solver/cheapest_first_search'], function(Solver){
  describe("Cheapest first search solver", function(){
    var exploredSetSizeWithoutHeuristic,
        exploredSetSizeWithHeuristic,
        makeTenProblem,
        solver;

    beforeEach(function(){
      makeTenProblem = {
        initialState: '',
        possibleActions: function(state){
          if(state.length > 10) {
            return [];
          }
          return ['a', 'aa'];
        },
        result: function(state, action){
          return state + action;
        },
        goalReached: function(state){
          return (state === "aaaaaaaaaa");
        },
        stepCost: function(state, action){
          return 1;
        },
        goalDistanceHeuristic: function(state){
          return 0;
        }
      };

      solver = new Solver(makeTenProblem);
    });

    describe(".solve()", function(){
      it("should solve the problem optimally", function(){
        var solution = solver.solve();
        console.log(solver.exploredSet);
        expect(solution.length).toEqual(6);
        expect(solution[0].state).toEqual('');
        expect(solution[1].state).toEqual("aa");
        expect(solution[2].state).toEqual("aaaa");
        expect(solution[3].state).toEqual("aaaaaa");
        expect(solution[4].state).toEqual("aaaaaaaa");
        expect(solution[5].state).toEqual("aaaaaaaaaa");
        exploredSetSizeWithoutHeuristic = _.size(solver.exploredSet);
      });

      it("should solve the problem optimally and more efficiently with a sensible heuristic", function(){
        makeTenProblem.goalDistanceHeuristic = function(state){
          return Math.abs(10 - state.length);
        };
        var solution = solver.solve();
        console.log(solver.exploredSet);
        expect(solution.length).toEqual(6);
        expect(solution[0].state).toEqual('');
        expect(solution[1].state).toEqual("aa");
        expect(solution[2].state).toEqual("aaaa");
        expect(solution[3].state).toEqual("aaaaaa");
        expect(solution[4].state).toEqual("aaaaaaaa");
        expect(solution[5].state).toEqual("aaaaaaaaaa");
        exploredSetSizeWithHeuristic = _.size(solver.exploredSet);
        expect(exploredSetSizeWithHeuristic < exploredSetSizeWithoutHeuristic).toBe(true);
      });
    });
  });
});
