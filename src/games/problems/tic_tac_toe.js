define(['underscore'], function(_){
  var ticTacToe = {
    X: 'x',
    O: 'o',
    initialState: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
    player: function(state) {
      if(this._countXs(state) > this._countOs(state)) {
        return 2;
      } else {
        return 1;
      }
    },
    actions: function(state) {
     //TODO   
    },
    result: function(state, action) {
     //TODO   
    },
    terminalTest: function(state) {
      return true; //TODO
    },
    utility: function(terminalState, player) {
      //TODO return 1, 0
    },
    _countXs: function(state) {
      return this._countEntity(this.X, state);
    },
    _countOs: function(state) {
      return this._countEntity(this.O, state);
    },
    _countEntity: function(entity, state) {
      var count = 0;
      _.each(state, function(row){
        _.each(row, function(el){
          if(el === entity){
            count += 1;
          }
        });
      });
      return count; //TODO - make this method neater - use flatten? map? something else?
    },
  };



  Maze.prototype.possibleActions = function(state){
    var actions = [],
        stateX = state[0], stateY = state[1],
        _this = this;
        _.each([Maze.N, Maze.S, Maze.E, Maze.W], function(direction){
          if ((_this.maze[stateY][stateX] & direction) != 0) {
            actions.push(direction);
          }
        });
    return actions;
  };

  Maze.prototype.result = function(state, action){
    var stateX = state[0], stateY = state[1];
    return [stateX + Maze.DX[action], stateY + Maze.DY[action]];
  };

  Maze.prototype.stepCost = function(state, action){
    return 1;
  };

  Maze.prototype.goalReached = function(state){
    return (state.join(',') === this._goalState().join(','));
  };

  Maze.prototype._goalState = function(){
    return [this._width - 1, this._height - 1];
  };

  Maze.prototype.goalDistanceHeuristic = function(state){
    var stateX = state[0], stateY = state[1],
        goal = this._goalState(),
        goalX = goal[0], goalY = goal[1];
    return Math.abs(goalX - stateX) + Math.abs(goalY - stateY);
  };

  return Maze;
});
