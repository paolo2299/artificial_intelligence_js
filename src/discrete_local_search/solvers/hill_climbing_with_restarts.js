define(['underscore'], function(_){
  //TODO - this class is pretty generic - move it to a shared resource for all solvers?
  var solverWithRestarts = {
    solve: function(problem, solver, options){
      options = options || {};
      var restarts = options['maxRestarts'] || 15;
      var objFn = problem.objectiveFunction, //TODO - figure out why this doensn't work
          currentSolution = solver.solve(problem),
          possibleSolution;
      while(restarts >= 0){
        possibleSolution = solver.solve(problem);
        if (problem.objectiveFunction(possibleSolution) > problem.objectiveFunction(currentSolution)) {
          currentSolution = possibleSolution;
        }
        restarts -= 1;
        //TODO - check if there is a known goal to reach and possibly exit early
      }
      return currentSolution;
    }
  };

  return solverWithRestarts;
});
