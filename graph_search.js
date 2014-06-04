/* Copyright (c) 2012 David Siegel

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE. */

(function(){function t(e){return 2*e+1}function n(e){return 2*e+2}function r(e){return Math.floor((e+1)/2)-1}var e=typeof module!="undefined"&&module.exports?module.exports:window.priority_queue={};e.PriorityQueue=function o(e,i){function u(e,t){var n=i[e];i[e]=i[t],i[t]=n}function a(r){var s=i.length,o,a,f;for(;;){o=r,a=t(r),f=n(r),a<s&&e(i[a],i[o])<0&&(o=a),f<s&&e(i[f],i[o])<0&&(o=f);if(o===r)break;u(r,o),r=o}}function f(e){var t=i[e],n=i.pop();return i.length===e?t:(i.length>0&&(i[e]=n,a(e)),t)}function l(e){var t=0,n=i.length,r;for(;t<n;++t){r=i[t];if(e(r))return f(t),r}return null}if(!(this instanceof o))return new o(e,i);e=e||s,i=i||[],this.deleteAll=function(t){while(l(t));},this.push=function(){var n=i.length,s=n+arguments.length,o,a;i.push.apply(i,arguments);for(;n<s;++n){o=n,a=r(n);for(;o>0&&e(i[o],i[a])<0;o=a,a=r(o))u(o,a)}return i.length},this.shift=function(){return f(0)},this.__defineGetter__("length",function(){return i.length});for(var c=r(i.length-1);c>=0;--c)a(c)};var i=e.max_first=function(t,n){return n-t},s=e.min_first=function(t,n){return t-n}})(),define("priority_queue",function(e){return function(){var t,n;return t||e.priority_queue}}(this)),define("graph_search/frontier",["priority_queue"],function(e){var t=function(){this._queue=e.PriorityQueue(function(e,t){return e.priority()-t.priority()}),this._states={}};return t.prototype.pop=function(){var e=this._queue.shift();return e?(delete this._states[e.state],e):null},t.prototype.top=function(){var e=this.pop();return e?(this.add(e),e):null},t.prototype.getNodeWithState=function(e){var t=this._states[e];return t!==undefined?t:null},t.prototype.add=function(e){if(this._states[e.state]!==undefined)throw new Error("Node with state "+e.state+" already exists in the frontier");return this._queue.push(e),this._states[e.state]=e,this},t.prototype.delete=function(e){return this._queue.deleteAll(function(t){return t.state===e.state}),delete this._states[e.state],this},t.prototype.isEmpty=function(){return this._queue.length===0},t}),define("graph_search/node",["underscore","graph_search/frontier"],function(e,t){var n=function(t){t=t||{},e.each(["problem","state","action","parent","pathCost"],function(e){if(t[e]===undefined)throw new Error("Missing option "+e+" for node constructor")}),this.problem=t.problem,this.state=t.state,this.action=t.action,this.parent=t.parent,this.pathCost=t.pathCost};return n.initialNode=function(e){return new n({problem:e,state:e.initialState,pathCost:0,parent:null,action:null})},n.prototype.child=function(e){var t=this.problem.result(this.state,e),r=this.pathCost+this.problem.stepCost(this.state,e);return new n({problem:this.problem,state:t,parent:this,action:e,pathCost:r})},n.prototype.priority=function(){return this.pathCost+this.problem.goalDistanceHeuristic(this.state)},n.prototype.path=function(){var e=[],t=this;while(t)e.push(t),t=t.parent;return e.reverse()},n}),define("graph_search/solvers/cheapest_first_search",["underscore","graph_search/frontier","graph_search/node"],function(e,t,n){var r=function(e){var r=n.initialNode(e);this.problem=e,this.frontier=new t,this.frontier.add(r),this.exploredSet={}};return r.prototype.solve=function(){var t,n,r=this;for(;;){if(this.frontier.isEmpty())return null;t=this.frontier.pop();if(this.problem.goalReached(t.state))return t.path();this.exploredSet[t.state]=!0,e.each(this.problem.possibleActions(t.state),function(e){var n=t.child(e),i=r.frontier.getNodeWithState(n.state);!i&&!r.exploredSet[n.state]?r.frontier.add(n):i&&i.priority>n.priority&&(r.frontier.delete(n),r.frontier.add(n))})}},r}),define("graph_search/problems/sliding_tile_puzzle",["underscore"],function(e){var t=function(e,t){this.size=e||3,this.initialState=t||this._goalState()};return t.RANDOM_ITERATIONS=100,t.prototype.shuffle=function(){return this.initialState=this._randomState(),this},t.prototype.possibleActions=function(e){var t=[],n,r,i;return n=this._blankCoordinate(e),r=n[0],i=n[1],i<this.size&&t.push("up"),i>1&&t.push("down"),r<this.size&&t.push("left"),r>1&&t.push("right"),t},t.prototype.result=function(t,n){var r,i,s,o,u,a,f,l;r=this._blankCoordinate(t),i=r[0],s=r[1];switch(n){case"left":o=i+1,u=s;break;case"right":o=i-1,u=s;break;case"up":o=i,u=s+1;break;case"down":o=i,u=s-1}return a=this._blankIndex(t),f=this._coordinateToIndex(o,u),l=e.clone(t),l[f]=t[a],l[a]=t[f],l},t.prototype.stepCost=function(e,t){return 1},t.prototype.goalReached=function(e){return e.join(",")===this._goalState().join(",")},t.prototype.goalDistanceHeuristic=function(t){var n=0,r=this,i,s,o,u,a,f;return e.each(t,function(e,t){if(e===null)return;i=r._indexToCoordinate(t),s=i[0],o=i[1],u=r._indexToCoordinate(e-1),a=u[0],f=u[1],n+=Math.abs(a-s)+Math.abs(f-o)}),n},t.prototype._randomState=function(){var n=this._goalState(),r=this,i,s;return e(t.RANDOM_ITERATIONS).times(function(){s=r.possibleActions(n),i=s[e.random(s.length-1)],n=r.result(n,i)}),n},t.prototype._goalState=function(){var t=[];return e(Math.pow(this.size,2)-1).times(function(e){t.push(e+1)}),t.push(null),t},t.prototype._blankCoordinate=function(e){return this._indexToCoordinate(this._blankIndex(e))},t.prototype._blankIndex=function(t){return e.indexOf(t,null)},t.prototype._indexToCoordinate=function(e){var t=e%this.size+1,n=Math.floor(e/this.size)+1;return[t,n]},t.prototype._coordinateToIndex=function(e,t){return(t-1)*this.size+(e-1)},t}),require(["graph_search/frontier","graph_search/node","graph_search/solvers/cheapest_first_search","graph_search/problems/sliding_tile_puzzle"],function(){}),define("graph_search_main",function(){});