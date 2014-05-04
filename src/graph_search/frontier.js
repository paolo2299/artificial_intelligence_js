define(['lib/underscore', 'lib/priority_queue'], function(_, pq){
  
  var Frontier = function(){
    this._queue = pq.PriorityQueue(function(n1, n2){ 
      return n2.priority - n1.priority;
    });
    this._states = {};
    this._deleted_states = {};
  };

  Frontier.prototype.pop = function(){
    var node;
    while(node = this._queue.shift()){
      if (this._deleted_states[node.state] === undefined) {
        delete this._states[node.state];
        return node;
      }
    }
    return null;
  };

  Frontier.prototype.top = function(){
    var node = this.pop();
    if(node){
      this.add(node);
      return node;
    }
    return null;
  };

  Frontier.prototype.getNodeWithState = function(state){
    var node = this._states[state];
    if (node !== undefined) {
      return node;
    }
    return null;
  }

  Frontier.prototype.add = function(node){
    if (this._states[node.state] !== undefined){
      throw new Error("Node with state " + node.state + " already exists in the frontier");
    }
    this._queue.push(node);
    this._states[node.state] = node;
    delete this._deleted_states[node.state];
    return this;
  };

  Frontier.prototype.delete = function(node){
    this._deleted_states[node.state] = true;
    delete this._states[node.state]
    return this;
  };

  Frontier.prototype.isEmpty = function(){
    return (_.size(this._states) === 0);
  };

  return Frontier;
});
