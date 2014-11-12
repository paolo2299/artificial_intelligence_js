define(['underscore'], function(_){
  var ticTacToe = {
    X: 'x',
    O: 'o',
    PLAYER1: 1,
    PLAYER2: 2,

    initialState: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],

    player: function(state) {
      if((this._countPreviousMoves(state) % 2) === 0) {
        return this.PLAYER1;
      } else {
        return this.PLAYER2;
      }
    },

    actions: function(state) {
     var availableCoordinates = [],
         player = this.player(state),
         placeableEntity = (player === this.PLAYER1) ? this.X : this.O;
     _.each(state, function(row, row_index){
       _.each(row, function(entity, column_index){
         if(entity === null){
           availableCoordinates.push([row_index, column_index]);
         }
       });
     });
     return _.map(availableCoordinates, function(coord){
       return {
         entity: placeableEntity,
         coordinate: coord
       };
     });
    },

    result: function(state, action) {
      var row = action.coordinate[0],
          column = action.coordinate[1],
          resultState = state.slice(0);
      //TODO - should this check if the action is valid first?
      resultState[row][column] = action.entity;
      return resultState;
    },

    terminalTest: function(state) {
      var terminal = false;

      if((this._countPreviousMoves(state) < 9) && (this._winner(state) === null)){
        return false
      }
      return true;
    },

    utility: function(terminalState, player) {
      var winner;
      if(!this.terminalTest(terminalState)) {
        throw "non-terminal state provided";
      }
      winner = this._winner(terminalState);
      if(winner === null) {
        return 0.5;
      }
      return (winner === player) ? 1 : 0;
    },

    _winner: function(state){
      var winner = null,
          _this = this;
      _.each(this._rowsColsAndDiagonals(state), function(array){
        if(array.join('') === _this.X + _this.X + _this.X) { //TODO - make an Array.prototype.equals helper method
          winner = 1;
        } else if(array.join('') === _this.O + _this.O + _this.O) {
          winner = 2;
        } //TODO - how to break from underscore loop - also other bits of codebase that need this
      });
      return winner
    },

    _rowsColsAndDiagonals: function(state) {
      return [
        [state[0][0], state[0][1], state[0][2]],  //row 0
        [state[1][0], state[1][1], state[1][2]],  //row 1
        [state[2][0], state[2][1], state[2][2]],  //row 2
        [state[0][0], state[1][0], state[2][0]],  //col 0
        [state[0][1], state[1][1], state[2][1]],  //col 1
        [state[0][2], state[1][2], state[2][2]],  //col 2
        [state[0][0], state[1][1], state[2][2]],  //diag 1
        [state[0][2], state[1][1], state[2][0]]   //diag 2
      ];
    },

    _countPreviousMoves: function(state) {
      var count = 0;
      _.each(state, function(row){
        _.each(row, function(el){
          if(el != null){
            count += 1;
          }
        });
      });
      return count; //TODO - make this method neater - use flatten? map? something else?
    },
  };

  return ticTacToe;
});
