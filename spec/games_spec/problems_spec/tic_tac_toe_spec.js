define(['underscore', 'games/problems/tic_tac_toe'], function(_, ticTacToe){
  describe("ticTacToe", function(){

    var player1 = ticTacToe.PLAYER1,
        player2 = ticTacToe.PLAYER2;

    describe(".player(state)", function(){
      it("should return the correct player", function(){
        var state;

        state = [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ];
        expect(ticTacToe.player(state)).toEqual(ticTacToe.PLAYER1);

        state = [
          [null, null, null],
          [null, 'x', null],
          [null, null, null]
        ];
        expect(ticTacToe.player(state)).toEqual(ticTacToe.PLAYER2);

        state = [
          [null, null, null],
          [null, 'x', null],
          [null, null, 'o']
        ];
        expect(ticTacToe.player(state)).toEqual(ticTacToe.PLAYER1);
      });
    });

    describe(".actions(state)", function(){
      it("should return the available actions", function(){
        var state;

        state = [
          [null, null, null],
          [null, 'x', null],
          [null, null, null]
        ];
        //TODO how to compare arrays of objects? Or check an object appears in an array?
        //console.log(ticTacToe.actions(state));
      });
    });

    describe(".result(state, action)", function(){
      it("should return the correct result", function(){
        var state = [
          [null, null, null],
          [null, 'x', null],
          [null, null, null]
        ],
        newState;
        
        newState = ticTacToe.result(state, 
          {entity: ticTacToe.O, coordinate: [0,0]}
        );
        console.log(newState); //TODO - add comapre funciton for states
      });
    });

    describe(".terminalTest(state)", function(){
      it("should be false for non terminal states", function(){
        var state = [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ];

        expect(ticTacToe.terminalTest(state)).toEqual(false);

        state = [
          [null, null, null],
          [null, 'x', null],
          [null, null, null]
        ];

        expect(ticTacToe.terminalTest(state)).toEqual(false);

        state = [
          ['o', 'o', 'x'],
          ['x', 'x', 'o'],
          ['o', 'x', null]
        ];

        expect(ticTacToe.terminalTest(state)).toEqual(false);
      });

      it("should be true when a player has won", function(){
        var state = [
          [null, null, null],
          ['x', 'x', 'x'],
          [null, null, null]
        ];

        expect(ticTacToe.terminalTest(state)).toEqual(true);

        state = [
          ['o', null, null],
          [null, 'o', null],
          [null, null, 'o']
        ];

        expect(ticTacToe.terminalTest(state)).toEqual(true);

        state = [
          ['o', 'x', 'x'],
          ['o', 'x', 'o'],
          ['x', 'o', 'x']
        ];

        expect(ticTacToe.terminalTest(state)).toEqual(true);
      });

      it("should be true for a draw", function(){
        var state = [
          ['o', 'o', 'x'],
          ['x', 'x', 'o'],
          ['o', 'x', 'o']
        ];

        expect(ticTacToe.terminalTest(state)).toEqual(true);
      });
    });

    describe(".utility(terminalState, player)", function(){

      it("should throw an exception for non terminal states", function(){
        var state = [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ];

        //TODO - how to test this with Jasmine
      });

      it("should give the correct result player 1 has won", function(){
        var state = [
          [null, null, null],
          ['x', 'x', 'x'],
          [null, null, null]
        ];

        expect(ticTacToe.utility(state, player1)).toEqual(1);
        expect(ticTacToe.utility(state, player2)).toEqual(0);

        state = [
          ['o', 'x', 'x'],
          ['o', 'x', 'o'],
          ['x', 'o', 'x']
        ];

        expect(ticTacToe.utility(state, player1)).toEqual(1);
        expect(ticTacToe.utility(state, player2)).toEqual(0);
      });

      it("should give the correct result player 2 has won", function(){
        var state = [
          [null, null, null],
          ['o', 'o', 'o'],
          [null, null, null]
        ];

        expect(ticTacToe.utility(state, player1)).toEqual(0);
        expect(ticTacToe.utility(state, player2)).toEqual(1);

        state = [
          ['x', 'o', 'o'],
          ['x', 'o', 'x'],
          ['o', 'x', 'o']
        ];

        expect(ticTacToe.utility(state, player1)).toEqual(0);
        expect(ticTacToe.utility(state, player2)).toEqual(1);
      });

      it("should return 0.5 for either player for a draw", function(){
        var state = [
          ['o', 'o', 'x'],
          ['x', 'x', 'o'],
          ['o', 'x', 'o']
        ];

        expect(ticTacToe.utility(state, player1)).toEqual(0.5);
        expect(ticTacToe.utility(state, player2)).toEqual(0.5);
      });
    });
  });
});
