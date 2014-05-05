define(['lib/underscore', 'src/graph_search/frontier', 'src/graph_search/node'], function(_, Frontier, Node){

  var Solver = function(problem){
    var initialNode = Node.initialNode(problem);
    this.problem = problem;
    this.frontier = new Frontier();
    this.frontier.add(initialNode);
    this.exploredSet = {};
  };

  Solver.prototype.solve = function(){
    var node,
        solution;
    while (true) {
      if (this.frontier.isEmpty()) {
        //no possible solution
        return null;
      }
      node = this.frontier.pop();
      if (problem.goalReached(node.state)) {
        //we've found the optimal solution
        return node.path();
      }
      //we've not found the solution yet - continue to expand the frontier
      exploredSet[node.state] = true;
      _.each(this.problem.possibleActions(node.state), function(action){
        var child = node.child(action),
            existingNode = this.frontier.getNodeWithState(child.state);
        //if we've not explored this state before add node to the frontier
        if(!existingNode && !this.exploredSet[child.state]) {
          this.frontier.add(child);
        } 
        //else if we've found a better route to this state, replace the existing node with this one
        else if (existingNode && (existingNode.priority > child.priority)) {
          this.frontier.delete(child);
          this.frontier.add(child);
        }
      });
    }
  };
});
