define(['lib/underscore'], function(_){
  var SlidingTilePuzzle = function(size, initialState) {
    this.size = size || 3;
    this.initialState = initialState || this._goalState();
  };

  SlidingTilePuzzle.RANDOM_ITERATIONS = 100;

  SlidingTilePuzzle.prototype.shuffle = function(){
    this.initialState = this._randomState();
    return this;
  };

  SlidingTilePuzzle.prototype.possibleActions = function(state){
    var actions = [],
        blankCoord, blankX, blankY;
    blankCoord = this._blankCoordinate(state);
    blankX = blankCoord[0];
    blankY = blankCoord[1];
    if( blankY < this.size ){
      actions.push("up");
    }
    if( blankY > 1 ){
      actions.push("down");
    }
    if( blankX < this.size ){
      actions.push("left");
    }
    if( blankX > 1 ){
      actions.push("right");
    }
    return actions;
  };

  SlidingTilePuzzle.prototype.result = function(state, action){
    var blankCoord, blankX, blankY,
        targetX, targetY,
        sourceIndex, targetIndex,
        resultState;
    //Get the coordinate of the 'blank' square
    blankCoord = this._blankCoordinate(state);
    blankX = blankCoord[0];
    blankY = blankCoord[1];

    switch(action){
      case "left":
        targetX = blankX + 1;
        targetY = blankY;
        break;
      case "right":
        targetX = blankX - 1;
        targetY = blankY;
        break;
      case "up":
        targetX = blankX;
        targetY = blankY + 1;
        break;
      case "down":
        targetX = blankX;
        targetY = blankY - 1;
        break;
    }
    sourceIndex = this._blankIndex(state);
    targetIndex = this._coordinateToIndex(targetX, targetY);
    resultState = _.clone(state);
    resultState[targetIndex] = state[sourceIndex];
    resultState[sourceIndex] = state[targetIndex];
    return resultState;
  };

  SlidingTilePuzzle.prototype.stepCost = function(state, action){
    return 1;
  };

  SlidingTilePuzzle.prototype.goalReached = function(state){
    return (state.join(',') === this._goalState().join(','));
  };

  SlidingTilePuzzle.prototype.goalDistanceHeuristic = function(state){
    var distance = 0,
        _this = this,
        coord, coordX, coordY,
        goal, goalX, goalY;
    _.each(state, function(tile, idx){
      if( tile === null ){
        return;
      }
      coord = _this._indexToCoordinate(idx);
      coordX = coord[0];
      coordY = coord[1];
      goal = _this._indexToCoordinate(tile - 1);
      goalX = goal[0];
      goalY = goal[1];
      distance += (Math.abs(goalX - coordX) + Math.abs(goalY - coordY));
    });
    return distance;
  };

  //private

  SlidingTilePuzzle.prototype._randomState = function(){
    var state = this._goalState(),
        _this = this,
        action,
        possibleActions;
    _(SlidingTilePuzzle.RANDOM_ITERATIONS).times(function(){
      possibleActions = _this.possibleActions(state);
      action = possibleActions[_.random(possibleActions.length - 1)];
      state = _this.result(state, action);
    });
    return state;
  };

  SlidingTilePuzzle.prototype._goalState = function(){
    var goalState = [];
    _(Math.pow(this.size, 2) - 1).times(function(n){
      goalState.push(n + 1);
    });
    goalState.push(null);
    return goalState;
  };

  SlidingTilePuzzle.prototype._blankCoordinate = function(state){
    return this._indexToCoordinate(this._blankIndex(state));
  };

  SlidingTilePuzzle.prototype._blankIndex = function(state){
    return _.indexOf(state, null);
  };

  SlidingTilePuzzle.prototype._indexToCoordinate = function(index){
    var coordX = (index % this.size) + 1,
        coordY = Math.floor(index / this.size) + 1;
    return [coordX, coordY];
  };

  SlidingTilePuzzle.prototype._coordinateToIndex = function(coordX, coordY){
    return (coordY - 1) * this.size + (coordX - 1);
  };

  return SlidingTilePuzzle;
});
