define(['lib/priority_queue'], function(pq){
  
  var Frontier = function(){
    this._queue = pq.PriorityQueue(function(n1, n2){ 
      return n1.priority() - n2.priority();
    });
    this._states = {};
  };

  Frontier.prototype.pop = function(){
    var node = this._queue.shift();
    if(node) {
      delete this._states[node.state];
      return node;
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
    return this;
  };

  Frontier.prototype.delete = function(node){
    this._queue.deleteAll(function(n){
      return n.state === node.state;
    });
    delete this._states[node.state];
    return this;
  };

  Frontier.prototype.isEmpty = function(){
    return (this._queue.length === 0);
  };

  return Frontier;
});
