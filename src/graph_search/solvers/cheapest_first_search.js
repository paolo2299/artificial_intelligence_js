define(['underscore', 'graph_search/frontier', 'graph_search/node'], function(_, Frontier, Node){

  //TODO - follow the lead of discrete_local_search and return an object here, not an initializer
  var Solver = function(problem){
    var initialNode = Node.initialNode(problem);
    this.problem = problem;
    this.frontier = new Frontier();
    this.frontier.add(initialNode);
    this.exploredSet = {};
  };

  Solver.prototype.solve = function(){
    var node,
        solution,
        _this = this;
    while (true) {
      if (this.frontier.isEmpty()) {
        //no possible solution
        return null;
      }
      node = this.frontier.pop();
      if (this.problem.goalReached(node.state)) {
        //we've found the optimal solution
        return node.path();
      }
      //we've not found the solution yet - continue to expand the frontier
      this.exploredSet[node.state] = true;
      _.each(this.problem.possibleActions(node.state), function(action){
        var child = node.child(action),
            existingNode = _this.frontier.getNodeWithState(child.state);
        //if we've not explored this state before add node to the frontier
        if(!existingNode && !_this.exploredSet[child.state]) {
          _this.frontier.add(child);
        } 
        //else if we've found a better route to this state, replace the existing node with this one
        else if (existingNode && (existingNode.priority > child.priority)) {
          _this.frontier.delete(child);
          _this.frontier.add(child);
        }
      });
    }
  };

  return Solver;
});
