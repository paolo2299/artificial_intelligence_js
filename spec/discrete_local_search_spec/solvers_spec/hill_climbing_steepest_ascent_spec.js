define(['discrete_local_search/solvers/hill_climbing_steepest_ascent'], function(solver){
  describe("Hill climbing steepest ascent solver", function(){
    var makeTenProblem;

    beforeEach(function(){
      makeTenProblem = {
        neighbouringStates: function(state){
          var neighbours = [state + 'a'];
          if (state.length > 1) {
            neighbours.push(state.slice(0, state.length - 1))
          }
          return neighbours;
        },
        
        randState: function(){
          return 'a';
        },

        objectiveFunction: function(state){
          return -1 * (Math.abs(state.length - 10));
        }
      };
    });

    describe(".solve()", function(){
      it("should solve the problem", function(){
        var solution = solver.solve(makeTenProblem);
        expect(solution).toEqual("aaaaaaaaaa");
      });

      describe("with a different starting state", function(){
        beforeEach(function(){
          makeTenProblem.randState = function(){
            return 'aaaaaaaaaaaaaaaaaaaa';
          };
        });

        it("should solve the problem", function(){
          var solution = solver.solve(makeTenProblem);
          expect(solution).toEqual("aaaaaaaaaa");
        });
      });
    });
  });
});
