define(["jquery", "underscore", "../graph_search/problems/maze", "graph_search/solvers/cheapest_first_search"], function($, _, Maze, Solver){
  var defaultOptions = {
	  height: 10,
	  width: 10
  };

  var MazeUI = function(elementId, options){
    this.options = $.extend({}, defaultOptions, options || {});
    this._elementId = elementId;
    this._maze = new Maze(this.options);
    this._render();
  };

  //public

  MazeUI.prototype.solve = function() {
    var solver,
        solution,
        i;
    solver = new Solver(this._maze);
    solution = solver.solve();
    for(i = 1; i < solution.length; i++) {
      this._moveToState(solution[i].state);
    }
  }

  //private

  MazeUI.prototype._render = function() {
    var height = this.options.height,
        width = this.options.width,
        mazeEl = $("#" + this._elementId);

    console.log(mazeEl);

    _.each(this._maze.maze, function(row){
      var rowDiv = $('<div />', {
        class: 'row'
      }).appendTo(mazeEl);
      _.each(row, function(cell){
        var wallClasses = "";
        if((cell & Maze.N) === 0){
          wallClasses = wallClasses + " north";
        }
        if((cell & Maze.S) === 0){
          wallClasses = wallClasses + " south";
        }
        if((cell & Maze.E) === 0){
          wallClasses = wallClasses + " east";
        }
        if((cell & Maze.W) === 0){
          wallClasses = wallClasses + " west";
        }
        $('<div />', {
          class: 'cell' + wallClasses
        }).appendTo(rowDiv);
      });
    });
  }

  return MazeUI;
});
