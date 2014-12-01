define(['underscore'], function(_){
  var solver = {
    nextMove: function(game, state, player){
      var _this = this,
          minimax,
          bestMinimax,
          bestAction;
      _.each(game.actions(state), function(action){
        minimax = _this._minimax(game, game.result(state, action), player);
        if((bestMinimax === undefined) || (minimax > bestMinimax)) {
          bestMinimax = minimax;
          bestAction = action;
        }
      });
      return bestAction;
    },

    playGame: function(game, state, maxMoves) {
      var moves = 0,
          states,
          player, 
          nextMove;
      state = state || game.initialState;
      maxMoves = maxMoves || 100;
      states = [state]
      while ((moves < maxMoves) && !game.terminalTest(state)) {
        player = game.player(state);
        nextMove = this.nextMove(game, state, player);
        state = game.result(state, nextMove);
        states.push(state);
        moves += 1;
      }
      return states;
    },

    _minimax: function(game, state, player){
      var _this = this;
      if(game.terminalTest(state)){
        return game.utility(state, player);
      }
      return _.max(_.map(game.actions, function(action){
        _this._minimax(game, game.result(state, action), player);
      }));
    }
  }

  return solver;
});
