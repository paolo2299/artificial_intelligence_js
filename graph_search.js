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

//Code obtained from https://github.com/agnat/js_priority_queue


(function() { // namespace


var exports = (typeof module !== 'undefined' && module.exports) ?
    module.exports : window.priority_queue = {};

exports.PriorityQueue = function PriorityQueue(compare, queue) {
  if (!(this instanceof PriorityQueue)) return new PriorityQueue(compare, queue);

  compare = compare || min_first;
  queue   = queue   || [];

  function swap(i, j) { var t = queue[i]; queue[i] = queue[j]; queue[j] = t; }

  function heapify(i) {
    var length = queue.length, x, l, r;
    while (true) {
      x = i; l = left(i); r = right(i);
      if (l < length && compare(queue[l], queue[x]) < 0) x = l;
      if (r < length && compare(queue[r], queue[x]) < 0) x = r;
      if (x === i) break;
      swap(i, x);
      i = x;
    }
  }

  function remove(i) {
    var t = queue[i], b = queue.pop();
    if (queue.length === i) {
      return t;
    }
    if (queue.length > 0) {
      queue[i] = b;
      heapify(i);
    }
    return t;
  }

  function deleteOne(fnPredicate) {
    var i = 0, l = queue.length, t;
    for (; i < l; ++i) {
      t = queue[i];
      if (fnPredicate(t)) {
        remove(i);
        return t;
      }
    }
    return null;
  }

  this.deleteAll = function deleteAll(fnPredicate) {
    while (deleteOne(fnPredicate)) {}
  }

  this.push = function push(/* element, ... */) {
    var i = queue.length, e = i + arguments.length, j, p;
    queue.push.apply(queue, arguments);
    for (; i < e; ++i) {
      j = i; p = parent(i);
      for (; j > 0 && compare(queue[j], queue[p]) < 0; j = p, p = parent(j)) {
        swap(j, p);
      }
    }
    return queue.length;
  }

  this.shift = function shift() { return remove(0); }
  this.__defineGetter__('length', function length() { return queue.length });

  for (var i = parent(queue.length - 1); i >= 0; --i) { heapify(i) }
}

function left(i)   { return 2 * i + 1 }
function right(i)  { return 2 * i + 2 }
function parent(i) { return Math.floor((i + 1) / 2) - 1 }

var max_first = exports.max_first = function max_first(a, b) { return b - a }
  , min_first = exports.min_first = function min_first(a, b) { return a - b }
  ;

})(); // end of namespace 
;
define("lib/priority_queue", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.priority_queue;
    };
}(this)));

define('graph_search/frontier',['lib/priority_queue'], function(pq){
  
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

//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,h=e.reduce,v=e.reduceRight,g=e.filter,d=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,w=Object.keys,_=i.bind,j=function(n){return n instanceof j?n:this instanceof j?void(this._wrapped=n):new j(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=j),exports._=j):n._=j,j.VERSION="1.6.0";var A=j.each=j.forEach=function(n,t,e){if(null==n)return n;if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a=j.keys(n),u=0,i=a.length;i>u;u++)if(t.call(e,n[a[u]],a[u],n)===r)return;return n};j.map=j.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e.push(t.call(r,n,u,i))}),e)};var O="Reduce of empty array with no initial value";j.reduce=j.foldl=j.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduce===h)return e&&(t=j.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(O);return r},j.reduceRight=j.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduceRight===v)return e&&(t=j.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=j.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(O);return r},j.find=j.detect=function(n,t,r){var e;return k(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},j.filter=j.select=function(n,t,r){var e=[];return null==n?e:g&&n.filter===g?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&e.push(n)}),e)},j.reject=function(n,t,r){return j.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},j.every=j.all=function(n,t,e){t||(t=j.identity);var u=!0;return null==n?u:d&&n.every===d?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var k=j.some=j.any=function(n,t,e){t||(t=j.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};j.contains=j.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:k(n,function(n){return n===t})},j.invoke=function(n,t){var r=o.call(arguments,2),e=j.isFunction(t);return j.map(n,function(n){return(e?t:n[t]).apply(n,r)})},j.pluck=function(n,t){return j.map(n,j.property(t))},j.where=function(n,t){return j.filter(n,j.matches(t))},j.findWhere=function(n,t){return j.find(n,j.matches(t))},j.max=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.max.apply(Math,n);var e=-1/0,u=-1/0;return A(n,function(n,i,a){var o=t?t.call(r,n,i,a):n;o>u&&(e=n,u=o)}),e},j.min=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.min.apply(Math,n);var e=1/0,u=1/0;return A(n,function(n,i,a){var o=t?t.call(r,n,i,a):n;u>o&&(e=n,u=o)}),e},j.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=j.random(r++),e[r-1]=e[t],e[t]=n}),e},j.sample=function(n,t,r){return null==t||r?(n.length!==+n.length&&(n=j.values(n)),n[j.random(n.length-1)]):j.shuffle(n).slice(0,Math.max(0,t))};var E=function(n){return null==n?j.identity:j.isFunction(n)?n:j.property(n)};j.sortBy=function(n,t,r){return t=E(t),j.pluck(j.map(n,function(n,e,u){return{value:n,index:e,criteria:t.call(r,n,e,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=E(r),A(t,function(i,a){var o=r.call(e,i,a,t);n(u,o,i)}),u}};j.groupBy=F(function(n,t,r){j.has(n,t)?n[t].push(r):n[t]=[r]}),j.indexBy=F(function(n,t,r){n[t]=r}),j.countBy=F(function(n,t){j.has(n,t)?n[t]++:n[t]=1}),j.sortedIndex=function(n,t,r,e){r=E(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;r.call(e,n[o])<u?i=o+1:a=o}return i},j.toArray=function(n){return n?j.isArray(n)?o.call(n):n.length===+n.length?j.map(n,j.identity):j.values(n):[]},j.size=function(n){return null==n?0:n.length===+n.length?n.length:j.keys(n).length},j.first=j.head=j.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:0>t?[]:o.call(n,0,t)},j.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},j.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},j.rest=j.tail=j.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},j.compact=function(n){return j.filter(n,j.identity)};var M=function(n,t,r){return t&&j.every(n,j.isArray)?c.apply(r,n):(A(n,function(n){j.isArray(n)||j.isArguments(n)?t?a.apply(r,n):M(n,t,r):r.push(n)}),r)};j.flatten=function(n,t){return M(n,t,[])},j.without=function(n){return j.difference(n,o.call(arguments,1))},j.partition=function(n,t){var r=[],e=[];return A(n,function(n){(t(n)?r:e).push(n)}),[r,e]},j.uniq=j.unique=function(n,t,r,e){j.isFunction(t)&&(e=r,r=t,t=!1);var u=r?j.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:j.contains(a,r))||(a.push(r),i.push(n[e]))}),i},j.union=function(){return j.uniq(j.flatten(arguments,!0))},j.intersection=function(n){var t=o.call(arguments,1);return j.filter(j.uniq(n),function(n){return j.every(t,function(t){return j.contains(t,n)})})},j.difference=function(n){var t=c.apply(e,o.call(arguments,1));return j.filter(n,function(n){return!j.contains(t,n)})},j.zip=function(){for(var n=j.max(j.pluck(arguments,"length").concat(0)),t=new Array(n),r=0;n>r;r++)t[r]=j.pluck(arguments,""+r);return t},j.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},j.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=j.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},j.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},j.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=new Array(e);e>u;)i[u++]=n,n+=r;return i};var R=function(){};j.bind=function(n,t){var r,e;if(_&&n.bind===_)return _.apply(n,o.call(arguments,1));if(!j.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));R.prototype=n.prototype;var u=new R;R.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},j.partial=function(n){var t=o.call(arguments,1);return function(){for(var r=0,e=t.slice(),u=0,i=e.length;i>u;u++)e[u]===j&&(e[u]=arguments[r++]);for(;r<arguments.length;)e.push(arguments[r++]);return n.apply(this,e)}},j.bindAll=function(n){var t=o.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return A(t,function(t){n[t]=j.bind(n[t],n)}),n},j.memoize=function(n,t){var r={};return t||(t=j.identity),function(){var e=t.apply(this,arguments);return j.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},j.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},j.defer=function(n){return j.delay.apply(j,[n,1].concat(o.call(arguments,1)))},j.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var c=function(){o=r.leading===!1?0:j.now(),a=null,i=n.apply(e,u),e=u=null};return function(){var l=j.now();o||r.leading!==!1||(o=l);var f=t-(l-o);return e=this,u=arguments,0>=f?(clearTimeout(a),a=null,o=l,i=n.apply(e,u),e=u=null):a||r.trailing===!1||(a=setTimeout(c,f)),i}},j.debounce=function(n,t,r){var e,u,i,a,o,c=function(){var l=j.now()-a;t>l?e=setTimeout(c,t-l):(e=null,r||(o=n.apply(i,u),i=u=null))};return function(){i=this,u=arguments,a=j.now();var l=r&&!e;return e||(e=setTimeout(c,t)),l&&(o=n.apply(i,u),i=u=null),o}},j.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},j.wrap=function(n,t){return j.partial(t,n)},j.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},j.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},j.keys=function(n){if(!j.isObject(n))return[];if(w)return w(n);var t=[];for(var r in n)j.has(n,r)&&t.push(r);return t},j.values=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},j.pairs=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},j.invert=function(n){for(var t={},r=j.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},j.functions=j.methods=function(n){var t=[];for(var r in n)j.isFunction(n[r])&&t.push(r);return t.sort()},j.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},j.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},j.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)j.contains(r,u)||(t[u]=n[u]);return t},j.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]===void 0&&(n[r]=t[r])}),n},j.clone=function(n){return j.isObject(n)?j.isArray(n)?n.slice():j.extend({},n):n},j.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof j&&(n=n._wrapped),t instanceof j&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==String(t);case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;var a=n.constructor,o=t.constructor;if(a!==o&&!(j.isFunction(a)&&a instanceof a&&j.isFunction(o)&&o instanceof o)&&"constructor"in n&&"constructor"in t)return!1;r.push(n),e.push(t);var c=0,f=!0;if("[object Array]"==u){if(c=n.length,f=c==t.length)for(;c--&&(f=S(n[c],t[c],r,e)););}else{for(var s in n)if(j.has(n,s)&&(c++,!(f=j.has(t,s)&&S(n[s],t[s],r,e))))break;if(f){for(s in t)if(j.has(t,s)&&!c--)break;f=!c}}return r.pop(),e.pop(),f};j.isEqual=function(n,t){return S(n,t,[],[])},j.isEmpty=function(n){if(null==n)return!0;if(j.isArray(n)||j.isString(n))return 0===n.length;for(var t in n)if(j.has(n,t))return!1;return!0},j.isElement=function(n){return!(!n||1!==n.nodeType)},j.isArray=x||function(n){return"[object Array]"==l.call(n)},j.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){j["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),j.isArguments(arguments)||(j.isArguments=function(n){return!(!n||!j.has(n,"callee"))}),"function"!=typeof/./&&(j.isFunction=function(n){return"function"==typeof n}),j.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},j.isNaN=function(n){return j.isNumber(n)&&n!=+n},j.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},j.isNull=function(n){return null===n},j.isUndefined=function(n){return n===void 0},j.has=function(n,t){return f.call(n,t)},j.noConflict=function(){return n._=t,this},j.identity=function(n){return n},j.constant=function(n){return function(){return n}},j.property=function(n){return function(t){return t[n]}},j.matches=function(n){return function(t){if(t===n)return!0;for(var r in n)if(n[r]!==t[r])return!1;return!0}},j.times=function(n,t,r){for(var e=Array(Math.max(0,n)),u=0;n>u;u++)e[u]=t.call(r,u);return e},j.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},j.now=Date.now||function(){return(new Date).getTime()};var T={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};T.unescape=j.invert(T.escape);var I={escape:new RegExp("["+j.keys(T.escape).join("")+"]","g"),unescape:new RegExp("("+j.keys(T.unescape).join("|")+")","g")};j.each(["escape","unescape"],function(n){j[n]=function(t){return null==t?"":(""+t).replace(I[n],function(t){return T[n][t]})}}),j.result=function(n,t){if(null==n)return void 0;var r=n[t];return j.isFunction(r)?r.call(n):r},j.mixin=function(n){A(j.functions(n),function(t){var r=j[t]=n[t];j.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(j,n))}})};var N=0;j.uniqueId=function(n){var t=++N+"";return n?n+t:t},j.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","   ":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;j.template=function(n,t,r){var e;r=j.defaults({},r,j.templateSettings);var u=new RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(D,function(n){return"\\"+B[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=new Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,j);var c=function(n){return e.call(this,n,j)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},j.chain=function(n){return j(n).chain()};var z=function(n){return this._chain?j(n).chain():n};j.mixin(j),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];j.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];j.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),j.extend(j.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}}),"function"==typeof define&&define.amd&&define("underscore",[],function(){return j})}).call(this);
//# sourceMappingURL=underscore-min.map
;
define("lib/underscore", (function (global) {
    return function () {
        var ret, fn;
        return ret || global._;
    };
}(this)));

define('graph_search/node',['lib/underscore', 'graph_search/frontier'], function(_, Frontier){

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

define('graph_search/solver/cheapest_first_search',['lib/underscore', 'graph_search/frontier', 'graph_search/node'], function(_, Frontier, Node){

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

define('graph_search/problems/sliding_tile_puzzle',['lib/underscore'], function(_){
  var SlidingTilePuzzle = function(size, initialState) {
    this.size = size || 3;
    this.initialState = initialState || this._goalState();
  };

  SlidingTilePuzzle.RANDOM_ITERATIONS = 100;

  SlidingTilePuzzle.prototype.shuffle = function(){
    this.initialState = this._randomState();
    return this;
  };

  SlidingTilePuzzle.prototype.possibleActions = function(state){
    var actions = [],
        blankCoord, blankX, blankY;
    blankCoord = this._blankCoordinate(state);
    blankX = blankCoord[0];
    blankY = blankCoord[1];
    if( blankY < this.size ){
      actions.push("up");
    }
    if( blankY > 1 ){
      actions.push("down");
    }
    if( blankX < this.size ){
      actions.push("left");
    }
    if( blankX > 1 ){
      actions.push("right");
    }
    return actions;
  };

  SlidingTilePuzzle.prototype.result = function(state, action){
    var blankCoord, blankX, blankY,
        targetX, targetY,
        sourceIndex, targetIndex,
        resultState;
    //Get the coordinate of the 'blank' square
    blankCoord = this._blankCoordinate(state);
    blankX = blankCoord[0];
    blankY = blankCoord[1];

    switch(action){
      case "left":
        targetX = blankX + 1;
        targetY = blankY;
        break;
      case "right":
        targetX = blankX - 1;
        targetY = blankY;
        break;
      case "up":
        targetX = blankX;
        targetY = blankY + 1;
        break;
      case "down":
        targetX = blankX;
        targetY = blankY - 1;
        break;
    }
    sourceIndex = this._blankIndex(state);
    targetIndex = this._coordinateToIndex(targetX, targetY);
    resultState = _.clone(state);
    resultState[targetIndex] = state[sourceIndex];
    resultState[sourceIndex] = state[targetIndex];
    return resultState;
  };

  SlidingTilePuzzle.prototype.stepCost = function(state, action){
    return 1;
  };

  SlidingTilePuzzle.prototype.goalReached = function(state){
    return (state.join(',') === this._goalState().join(','));
  };

  SlidingTilePuzzle.prototype.goalDistanceHeuristic = function(state){
    var distance = 0,
        _this = this,
        coord, coordX, coordY,
        goal, goalX, goalY;
    _.each(state, function(tile, idx){
      if( tile === null ){
        return;
      }
      coord = _this._indexToCoordinate(idx);
      coordX = coord[0];
      coordY = coord[1];
      goal = _this._indexToCoordinate(tile - 1);
      goalX = goal[0];
      goalY = goal[1];
      distance += (Math.abs(goalX - coordX) + Math.abs(goalY - coordY));
    });
    return distance;
  };

  //private

  SlidingTilePuzzle.prototype._randomState = function(){
    var state = this._goalState(),
        _this = this,
        action,
        possibleActions;
    _(SlidingTilePuzzle.RANDOM_ITERATIONS).times(function(){
      possibleActions = _this.possibleActions(state);
      action = possibleActions[_.random(possibleActions.length - 1)];
      state = _this.result(state, action);
    });
    return state;
  };

  SlidingTilePuzzle.prototype._goalState = function(){
    var goalState = [];
    _(Math.pow(this.size, 2) - 1).times(function(n){
      goalState.push(n + 1);
    });
    goalState.push(null);
    return goalState;
  };

  SlidingTilePuzzle.prototype._blankCoordinate = function(state){
    return this._indexToCoordinate(this._blankIndex(state));
  };

  SlidingTilePuzzle.prototype._blankIndex = function(state){
    return _.indexOf(state, null);
  };

  SlidingTilePuzzle.prototype._indexToCoordinate = function(index){
    var coordX = (index % this.size) + 1,
        coordY = Math.floor(index / this.size) + 1;
    return [coordX, coordY];
  };

  SlidingTilePuzzle.prototype._coordinateToIndex = function(coordX, coordY){
    return (coordY - 1) * this.size + (coordX - 1);
  };

  return SlidingTilePuzzle;
});

require([
  "graph_search/frontier",
  "graph_search/node",
  "graph_search/solver/cheapest_first_search",
  "graph_search/problems/sliding_tile_puzzle"
  ], function () {
});

define("graph_search_main", function(){});

