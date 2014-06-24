define(["jquery", "graph_search/problems/sliding_tile_puzzle", "graph_search/solvers/cheapest_first_search"], function($, Puzzle, Solver){
  var defaultOptions = {
	  imageSize: 300,
	  puzzleSize: 3,
	  imageUrl: "http://www.acclaimimages.com/_gallery/_free_images/0124-1103-0716-0350_planet_earth_from_space_s.jpg"
  };

  var SlidingTileBoard = function(elementId, options){
    this.options = $.extend({}, defaultOptions, options || {});
    this.maxTileIndex = Math.pow(this.options.puzzleSize, 2);
    this.squareSize = this.options.imageSize/this.options.puzzleSize;
    this.elementId = elementId;
    this.boardId = elementId + 'Board';
    this.boardSelector = '#' + this.boardId;
    this.puzzle = new Puzzle(this.options.puzzleSize);
    this.zi = 1;
    this._render();
  };

  //public

  SlidingTileBoard.prototype.shuffle = function() {
    this.puzzle.shuffle();
    this._moveToState(this.puzzle.initialState);
  };

  SlidingTileBoard.prototype.solve = function() {
    var solver,
        solution,
        i;
    this.puzzle.initialState = this._getCurrentState();
    solver = new Solver(this.puzzle);
    solution = solver.solve();
    for(i = 1; i < solution.length; i++) {
      this._moveToState(solution[i].state);
    }
  }

  //private

  SlidingTileBoard.prototype._render = function() {
    var puzzleSize = this.options.puzzleSize,
	      boardSizePx = (this.squareSize * puzzleSize) + 'px',
	      elementId = this.elementId,
	      _this = this,
        coordx, coordy,
        i;

    $('#' + elementId).html("<div id = '" + this.boardId + "'></div>"); // Inject DIV into target, this is our game board
    $(this.boardSelector).css({ 
      position:'relative', 
      width: boardSizePx, 
      height: boardSizePx, 
      border: '1px solid gray' 
    });

    // Populate the game board's HTML container with squares
    for (i = 0; i < this.maxTileIndex; i++) {
      coordx = (i % puzzleSize) + 1;
      coordy = Math.floor(i / puzzleSize) + 1;
      $(this.boardSelector).append(
	      "<div id='square" + (i + 1) + 
	      "' data-coord-x='" + coordx + 
	      "' data-coord-y='" + coordy + 
	      "' style = 'position: absolute; " + 
	      "left: " + ((i % puzzleSize) * this.squareSize) + "px; " + 
		    "top: " + Math.floor(i / puzzleSize) * this.squareSize + "px; " + 
		    "width: " + this.squareSize + "px; " + 
		    "height: " + this.squareSize + "px; " + 
		    "text-align: center; " + 
		    "-moz-box-shadow: inset 0 0 20px #555555; " + 
		    "-webkit-box-shadow: inset 0 0 20px #555555; " + 
		    "box-shadow: inset 0 0 20px #555555; " + 
		    "background: #ffffff " + 
		                 "url(" + this.options.imageUrl  + ") " + 
		                 (-(i % puzzleSize) * this.squareSize) + "px " + 
		                 -Math.floor(i / puzzleSize) * this.squareSize + "px " + 
				"no-repeat !important'>" + 
	      "</div>"
      );
    }
    // Empty up the last square, as the starting point
    $(this.boardSelector + " > #square" + this.maxTileIndex).css({backgroundImage: "", background: "#ffffff"});
    // Attach click event to each square
    $(this.boardSelector).children("div").click(function() { _this._moveClickedSquare(this); });
  }

  SlidingTileBoard.prototype._moveClickedSquare = function(clickedSquare)
  {
    var emptySquare = $(this.boardSelector + " > #square" + Math.pow(this.options.puzzleSize, 2)),
        emptyCoordX = parseInt(emptySquare.attr('data-coord-x')),
        emptyCoordY = parseInt(emptySquare.attr('data-coord-y')),
        movable = false,
        clickedCoordX,
        clickedCoordY;
    
    clickedSquare = $(clickedSquare);
    clickedCoordX = parseInt(clickedSquare.attr('data-coord-x'));
    clickedCoordY = parseInt(clickedSquare.attr('data-coord-y'));
    // Locate movable tiles based on where the empty spot is, we can only move the four surrounding squares

    // The clicked square is east or west of the empty square
    if (emptyCoordY == clickedCoordY && Math.abs(clickedCoordX - emptyCoordX) == 1){
      movable = true;
    }

    // The clicked square is north or south of the empty square
    if (emptyCoordX == clickedCoordX && Math.abs(clickedCoordY - emptyCoordY) == 1){
      movable = true;
    }

    if (movable)
    {
      // Increment zindex so the clicked tile is always on top of all others
      $(clickedSquare).css("z-index", this.zi++);

      this._swapTiles(emptySquare, clickedSquare);
    }
  }

  SlidingTileBoard.prototype._swapTiles = function(tile1, tile2){
    var tile1x = parseInt(tile1.attr('data-coord-x')),
        tile1y = parseInt(tile1.attr('data-coord-y')),
        tile2x = parseInt(tile2.attr('data-coord-x')),
        tile2y = parseInt(tile2.attr('data-coord-y')),
        tile1left = tile1.css("left"),
        tile1top  = tile1.css("top"),
        tile2left = tile2.css("left"),
        tile2top  = tile2.css("top");

    // Swap squares... Animate clicked square into empty square position
    tile1.attr('data-coord-x', tile2x);
    tile1.attr('data-coord-y', tile2y);
    tile2.attr('data-coord-x', tile1x);
    tile2.attr('data-coord-y', tile1y);

    tile1.animate({ left: tile2left, top: tile2top }, 200, function(){});
    tile2.animate({ left: tile1left, top: tile1top }, 200, function(){});
  }

  SlidingTileBoard.prototype._moveTile = function(tile, index){
    var coordx = (index % this.options.puzzleSize) + 1,
        coordy = Math.floor(index / this.options.puzzleSize) + 1,
        tileleft = ((index % this.options.puzzleSize) * this.squareSize) + "px",
        tiletop  = (Math.floor(index / this.options.puzzleSize) * this.squareSize) + "px";

    // Swap squares... Animate clicked square into empty square position
    tile.attr('data-coord-x', coordx);
    tile.attr('data-coord-y', coordy);

    tile.animate({ left: tileleft, top: tiletop }, 200, function(){});
  }

  SlidingTileBoard.prototype._moveToState = function(state) {
    var tile,
        i;
    for(i = 0; i < state.length; i++){
      if(state[i] === null){
        tile = $(this.boardSelector + " > #square" + this.maxTileIndex);
      } else {
        tile = $(this.boardSelector + " > #square" + state[i]);
      }
      this._moveTile(tile, i);
    }
  }

  SlidingTileBoard.prototype._getCurrentState = function() {
    var currentState = [],
        indices = {},
        _this = this,
        i;
    $(this.boardSelector + " > div[id^='square']").each(function(){
      var coordx = parseInt($(this).attr('data-coord-x')),
          coordy = parseInt($(this).attr('data-coord-y')),
          squareNum = parseInt($(this).attr('id').slice(-1)),
          index = (coordy - 1)*_this.options.puzzleSize + (coordx - 1);
      indices[index] = squareNum;
    });
    for(i = 0; i < this.maxTileIndex; i++){
      if(indices[i] == this.maxTileIndex){
        currentState.push(null);
      } else {
        currentState.push(indices[i]);
      }
    }
    return currentState;
  }

  return SlidingTileBoard;
});
