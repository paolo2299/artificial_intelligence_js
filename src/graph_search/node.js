define(['lib/underscore', 'graph_search/frontier'], function(_, Frontier){

  var Node = function(opts){
    opts = opts || {};
    _.each(['problem', 'state', 'action', 'parent', 'pathCost'], function(key){
      if(opts[key] === undefined){
        throw new Error("Missing option " + key + " for node constructor");
      }
    });
    this.problem = opts.problem;
    this.state = opts.state;
    this.action = opts.action;
    this.parent = opts.parent;
    this.pathCost = opts.pathCost;
  };

  Node.initialNode = function(problem){
    return new Node({
      problem: problem,
      state: problem.initialState,
      pathCost: 0,
      parent: null,
      action: null
    });
  };

  Node.prototype.child = function(action){
    var childState = this.problem.result(this.state, action),
        childPathCost = this.pathCost + this.problem.stepCost(this.state, action);
    return new Node({
      problem: this.problem,
      state: childState,
      parent: this,
      action: action,
      pathCost: childPathCost
    });
  }

  Node.prototype.priority = function(){
    return this.pathCost + this.problem.goalDistanceHeuristic(this.state);
  }

  Node.prototype.path = function(){
    var steps = [],
        node = this;
    while(node) {
      steps.push(node);
      node = node.parent;
    }
    return steps.reverse();
  }

  return Node;
});
