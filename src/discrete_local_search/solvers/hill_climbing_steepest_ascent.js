//TODO - simulated annealing?
//TODO - local beam search?
//TODO - genetic algorithms?
//TODO - continuous local search?
//TODO - other bits of chapter 3? AND-OR etc.?

define(['underscore'], function(_){
  //TODO - add option to make sideways moves?
  var solver = {
    solve: function(problem){
      var objFn = problem.objectiveFunction, //TODO why this doesnt work
      currentState = problem.randState(),
      currentValue = problem.objectiveFunction(currentState),
      valueToBeat = currentValue,
      mostOptimalNeighbour = currentState,
      newValue;
      while(true) {
        _.each(problem.neighbouringStates(currentState), function(state){
          newValue = problem.objectiveFunction(state);
          if (newValue > valueToBeat) {
            mostOptimalNeighbour = state;
            valueToBeat = newValue;
          }
        });
        if (valueToBeat > currentValue) {
          currentState = mostOptimalNeighbour;
          currentValue = valueToBeat;
        } else {
          return currentState;
        }
      }
    }
  }

  return solver;
});
