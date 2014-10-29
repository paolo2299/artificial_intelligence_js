define(['underscore'], function(_){

  var Queens = function(options) {
    this.options = options || {};
    this._size = this.options.size || 8;
  };

  Queens.prototype.randState = function(){
    var state = [];
    var _this = this;
    _(this._size).times(function(n){
      state.push(_this._randomColumnPosition());
    });
    return state;
  };

  Queens.prototype.logThis = function(){
    console.log(this);
  };

  Queens.prototype.objectiveFunction = function(state){
    return -1 * this._numberOfConflicts(state);
  };

  Queens.prototype.neighbouringStates = function(state){
    var newState;
    var states = [];
    var _this = this;
    _.each(state, function(position_in_column, column){
      _(_this._size).times(function(n){
        if (position_in_column !== n){
          newState = state.slice(0); //is this really the best way to copy an array?
          newState[column] = n;
          states.push(newState);
        }
      }); 
    });
    return states;
  };

  Queens.prototype.goalReached = function(state){
    self.objectiveFunction(state) == 0;
  };

  Queens.prototype._randomColumnPosition = function(){
    return Math.floor(Math.random() * this._size)
  };

  Queens.prototype._numberOfConflicts = function(state){
    var conflicts = 0;
    _.each(state, function(a_position_in_column, a_column) {
      _.each(state, function(b_position_in_column, b_column) {
        if (a_column >= b_column) { //Only need to check each pair of queens once
          //continue; TODO is there a js equivalent of this?
        } else {
          if (a_position_in_column === b_position_in_column) {
            //queens are attacking each other on the same row
            conflicts += 1;
          } else {
            var row_diff = Math.abs(a_position_in_column - b_position_in_column),
                col_diff = Math.abs(a_column - b_column);
            if (row_diff === col_diff) {
              //queens are attacjing each other on the diagonal
              conflicts += 1;
            }
          }
        }
      });
    });
    return conflicts;
  };

  return Queens;
});
