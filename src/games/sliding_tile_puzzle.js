var games = AI.namespace('games');

games.SlidingTilePuzzle = (function(){

  var defaultOptions = {
	imageSize: 300,
	puzzleSize: 3,
	imageUrl: "http://www.acclaimimages.com/_gallery/_free_images/0124-1103-0716-0350_planet_earth_from_space_s.jpg"
      },
      problemServiceUrl = "http://shielded-basin-7502.herokuapp.com/problem_service/sliding_tile/",
      Constr;

  Constr = function(elementId, options){
    this.options = $.extend({}, defaultOptions, options || {});
    this.maxTileIndex = Math.pow(this.options.puzzleSize, 2);
    this.squareSize = this.options.imageSize/this.options.puzzleSize;
    this.elementId = elementId;
    this.boardId = elementId + 'Board';
    this.boardSelector = '#' + this.boardId;
    this.zi = 1;
    this._render();
  }

  //public

  Constr.prototype.shuffle = function() {
    var _this = this;
    $.getJSON(problemServiceUrl + this.options.puzzleSize + "/initial_state?callback=?&random=true", null, function(data){
      _this._moveToState(data);
    });
  }

  Constr.prototype.solve = function() {
    var _this = this,
        initialState = this._getCurrentState();
    $.getJSON(problemServiceUrl + this.options.puzzleSize + "/solution?callback=?&initial_state=" + initialState, function(data){
      for(var i = 1; i < data.length; i++) {
        _this._moveToState(data[i]['state']);
      }
    });
  }

  //private

  Constr.prototype._render = function() {
    var puzzleSize = this.options.puzzleSize,
	boardSizePx = (this.squareSize * puzzleSize) + 'px',
	elementId = this.elementId,
	_this = this;

    $('#' + elementId).html("<div id = '" + this.boardId + "'></div>"); // Inject DIV into target, this is our game board
    $(this.boardSelector).css({ 
      position:'relative', 
      width: boardSizePx, 
      height: boardSizePx, 
      border: '1px solid gray' 
    });

    // Populate the game board's HTML container with squares
    for (var i = 0; i < this.maxTileIndex; i++) {
      var coordx = (i % puzzleSize) + 1;
      var coordy = Math.floor(i / puzzleSize) + 1;
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

  Constr.prototype._moveClickedSquare = function(clickedSquare)
  {
    clickedSquare = $(clickedSquare);
    var empty_square = $(this.boardSelector + " > #square" + Math.pow(this.options.puzzleSize, 2));
    // Locate movable tiles based on where the empty spot is, we can only move the four surrounding squares
    var movable = false;

    var empty_coordx = parseInt(empty_square.attr('data-coord-x'));
    var empty_coordy = parseInt(empty_square.attr('data-coord-y'));
    var clicked_coordx = parseInt(clickedSquare.attr('data-coord-x'));
    var clicked_coordy = parseInt(clickedSquare.attr('data-coord-y'));

    // The clicked square is east or west of the empty square
    if (empty_coordy == clicked_coordy && Math.abs(clicked_coordx - empty_coordx) == 1){
      movable = true;
    }

    // The clicked square is north or south of the empty square
    if (empty_coordx == clicked_coordx && Math.abs(clicked_coordy - empty_coordy) == 1){
      movable = true;
    }

    if (movable)
    {
      // Increment zindex so the clicked tile is always on top of all others
      $(clickedSquare).css("z-index", this.zi++);

      this._swapTiles(empty_square, clickedSquare);
    }
  }

  Constr.prototype._swapTiles = function(tile1, tile2){
    var tile1x = parseInt(tile1.attr('data-coord-x'));
    var tile1y = parseInt(tile1.attr('data-coord-y'));
    var tile2x = parseInt(tile2.attr('data-coord-x'));
    var tile2y = parseInt(tile2.attr('data-coord-y'));

    // Swap squares... Animate clicked square into empty square position
    tile1.attr('data-coord-x', tile2x);
    tile1.attr('data-coord-y', tile2y);
    tile2.attr('data-coord-x', tile1x);
    tile2.attr('data-coord-y', tile1y);

    var tile1left = tile1.css("left");
    var tile1top  = tile1.css("top");
    var tile2left = tile2.css("left");
    var tile2top  = tile2.css("top");

    tile1.animate({ left: tile2left, top: tile2top }, 200, function(){});
    tile2.animate({ left: tile1left, top: tile1top }, 200, function(){});
  }

  Constr.prototype._moveTile = function(tile, index){
    var coordx = (index % 3) + 1;
    var coordy = Math.floor(index / 3) + 1;

    // Swap squares... Animate clicked square into empty square position
    tile.attr('data-coord-x', coordx);
    tile.attr('data-coord-y', coordy);

    var tileleft = ((index % 3) * this.squareSize) + "px";
    var tiletop  = (Math.floor(index / 3) * this.squareSize) + "px";

    tile.animate({ left: tileleft, top: tiletop }, 200, function(){});
  }

  Constr.prototype._moveToState = function(state) {
    var tile;
    for(var i = 0; i < state.length; i++){
      if(state[i] === null){
        tile = $(this.boardSelector + " > #square" + this.maxTileIndex);
      } else {
        tile = $(this.boardSelector + " > #square" + state[i]);
      }
      this._moveTile(tile, i);
    }
  }

  Constr.prototype._getCurrentState = function() {
    var currentState = [];
    var indices = {}
    $(this.boardSelector + " > div[id^='square']").each(function(){
      var coordx = parseInt($(this).attr('data-coord-x'));
      var coordy = parseInt($(this).attr('data-coord-y'));
      var squareNum = parseInt($(this).attr('id').slice(-1));
      var index = (coordy - 1)*3 + (coordx - 1)
      indices[index] = squareNum;
    });
    for(var i = 0; i < this.maxTileIndex; i++){
      if(indices[i] == this.maxTileIndex){
        currentState.push(0);
      } else {
        currentState.push(indices[i]);
      }
    }
    return currentState.join();
  }

  return Constr;
}());
