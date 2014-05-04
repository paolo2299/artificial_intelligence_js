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
    return undefined;
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
    delete this._deleted_states[node.state];
    return this;
  };

  Frontier.prototype.delete = function(node){
    this._deleted_states[node.state] = true;
  };

  Frontier.prototype.isEmpty = function(){
    //TODO take deleted states into account
    return this._queue.length === 0;
  };

  return Frontier;
});
