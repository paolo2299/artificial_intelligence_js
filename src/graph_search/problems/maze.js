define(['underscore'], function(_){
  var Maze = function(options) {
    this.options = options || {};
    if (this.options.height && this.options.width){
      this._height = this.options.height;
      this._width = this.options.width;
      this.maze = Maze.randomMaze(this._height, this._width);
    } else if (this.options.maze) {
      this.maze = this.options.maze;
      this._height = this.maze.length;
      this._width = this.maze[0].length;
    } else {
      throw "To initialize a Maze you must provide either a height and width or a maze";
    }
    if (this.options.initialState) {
      this._initialState = this.options.initialState;
    } else {
      this._initialState = [0, 0];
    }
  };

  Maze.N = 1;
  Maze.S = 2;
  Maze.E = 4;
  Maze.W = 8;

  Maze.DX = {};
  Maze.DX[Maze.N] = 0;
  Maze.DX[Maze.S] = 0;
  Maze.DX[Maze.E] = 1;
  Maze.DX[Maze.W] = -1;

  Maze.DY = {};
  Maze.DY[Maze.N] = -1;
  Maze.DY[Maze.S] = 1;
  Maze.DY[Maze.E] = 0;
  Maze.DY[Maze.W] = 0;

  Maze.OPPOSITE = {}; 
  Maze.OPPOSITE[Maze.E] = Maze.W; 
  Maze.OPPOSITE[Maze.W] = Maze.E;
  Maze.OPPOSITE[Maze.N] = Maze.S; 
  Maze.OPPOSITE[Maze.S] = Maze.N;

  Maze.TRANSLATION = {};
  Maze.TRANSLATION[Maze.N] = 'North'; 
  Maze.TRANSLATION[Maze.S] = 'South'; 
  Maze.TRANSLATION[Maze.E] = 'East'; 
  Maze.TRANSLATION[Maze.W] = 'West'; 

  Maze.randomMaze = function(height, width){
    var grid = [];

    //First initialize the grid
    _(height).times(function(n){
      var row = [];
      grid.push(row);
      _(width).times(function(n){
        row.push(0);
      })
    });

    function carvePassagesFrom(cx, cy, grid){
      var directions = _.shuffle([Maze.N, Maze.S, Maze.E, Maze.W]),
          height = grid.length,
          width = grid[0].length;
      
      _.each(directions, function(direction){
        var nx = cx + Maze.DX[direction], 
            ny = cy + Maze.DY[direction];

        if((ny >= 0 && ny <= height - 1) &&
           (nx >= 0 && nx <= width - 1)  &&
           (grid[ny][nx] === 0)) {
          grid[cy][cx] = grid[cy][cx] | direction;
          grid[ny][nx] = grid[ny][nx] | Maze.OPPOSITE[direction];
          carvePassagesFrom(nx, ny, grid);
        }
      });
    }

    carvePassagesFrom(0, 0, grid);
    return grid;
  };

  Maze.prototype.possibleActions = function(state){
    var actions = [],
        stateX = state[0], stateY = state[1],
        _this = this;
        _.each([Maze.N, Maze.S, Maze.E, Maze.W], function(direction){
          if ((_this.maze[stateY][stateX] & direction) != 0) {
            actions.push(dirction);
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
    return [this._size - 1, this._size - 1];
  };

  Maze.prototype.goalDistanceHeuristic = function(state){
    var stateX = state[0], stateY = state[1],
        goal = this._goalState(),
        goalX = goal[0], goalY = goal[1];
    return Math.abs(goalX - stateX) + Math.abs(goalY - stateY);
  };

  return Maze;
});
