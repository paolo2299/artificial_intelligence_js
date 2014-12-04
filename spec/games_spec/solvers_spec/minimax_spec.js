define(['games/solvers/minimax'], function(solver){
  describe("Minimax solver", function(){
    var constructStringGame;

    beforeEach(function(){
      //Game to try to fill a string with your
      //character faster than your opponent can 
      //fill the string with theirs
      constructStringGame = {
        initialState: "",

        actions: function(state){
          return ['x', 'a', 'b'];
        },

        result: function(state, action) {
          return state + action;
        },

        terminalTest: function(state) {
          if (state.length >= 4) {
            return true;
          } else {
            return false;
          }
        },

        utility: function(terminalState, player) {
          var as = (terminalState.match(/a/g) || []).length,
              bs = (terminalState.match(/b/g) || []).length;
          if (as === bs) {
            return 0.5;
          }
          else if (as > bs) {
            if (player === 1) {
              return 1;
            } else {
              return 0;
            }
          } else {
            if (player === 2) {
              return 1;
            } else {
              return 0;
            }
          }
        },

        player: function(state) {
          if ((state.length % 2) === 0) {
            return 1;
          } else {
            return 2;
          }
        }
      };
    });

    describe(".nextMove(game, state)", function(){
      it("should always add an 'a' when player 1 is to act and needs to act to force a draw", function(){
        expect(solver.nextMove(constructStringGame, "")).toEqual("a");
        expect(solver.nextMove(constructStringGame, "ab")).toEqual("a");
        expect(solver.nextMove(constructStringGame, "xx")).toEqual("a");
      });

      it("should always add an 'a' when player 1 is to act and needs to act to force a win", function(){
        expect(solver.nextMove(constructStringGame, "xa")).toEqual("a");
      });

      it("should always add an 'b' when player 2 is to act and needs to act to force a draw", function(){
        expect(solver.nextMove(constructStringGame, "a")).toEqual("b");
        expect(solver.nextMove(constructStringGame, "aba")).toEqual("b");
        expect(solver.nextMove(constructStringGame, "xxa")).toEqual("b");
      });

      it("should always add an 'b' when player 2 is to act and needs to act to force a win", function(){
        expect(solver.nextMove(constructStringGame, "x")).toEqual("b");
        expect(solver.nextMove(constructStringGame, "xba")).toEqual("b");
        expect(solver.nextMove(constructStringGame, "xxx")).toEqual("b");
      });
    });
  });
});
