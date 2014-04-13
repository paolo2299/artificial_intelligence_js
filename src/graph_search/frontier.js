define(['lib/underscore', 'lib/priority_queue'], function(_, pq){
  
  var Frontier = function(){
    this._queue = pq.PriorityQueue(function(n1, n2){ 
      return n2.priority - n1.priority;
    });
    this._states = {};
  };

  Frontier.prototype.pop = function(){
    //TODO implement an idea of deleted nodes
    var node = this._queue.shift();
    if (node !== undefined) {
      delete this._states[node.state];
    }
    return node;
  };

  Frontier.prototype.top = function(){
    return this._queue.queue[0];
  };

  Frontier.prototype.getNodeWithState = function(state){
    return this._states[state];
  }

  Frontier.prototype.add = function(node){
    //TODO raise if duplicate state
    this._queue.push(node);
    this._states[node.state] = node;
    return this;
  };

  Frontier.prototype.delete = function(node){
    //TODO
  };

  Frontier.prototype.isEmpty = function(){
    return this._queue.length === 0;
  };

  return Frontier;
});
