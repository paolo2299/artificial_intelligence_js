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

//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function(){function t(e){return 2*e+1}function n(e){return 2*e+2}function r(e){return Math.floor((e+1)/2)-1}var e=typeof module!="undefined"&&module.exports?module.exports:window.priority_queue={};e.PriorityQueue=function o(e,i){function u(e,t){var n=i[e];i[e]=i[t],i[t]=n}function a(r){var s=i.length,o,a,f;for(;;){o=r,a=t(r),f=n(r),a<s&&e(i[a],i[o])<0&&(o=a),f<s&&e(i[f],i[o])<0&&(o=f);if(o===r)break;u(r,o),r=o}}function f(e){var t=i[e],n=i.pop();return i.length===e?t:(i.length>0&&(i[e]=n,a(e)),t)}function l(e){var t=0,n=i.length,r;for(;t<n;++t){r=i[t];if(e(r))return f(t),r}return null}if(!(this instanceof o))return new o(e,i);e=e||s,i=i||[],this.deleteAll=function(t){while(l(t));},this.push=function(){var n=i.length,s=n+arguments.length,o,a;i.push.apply(i,arguments);for(;n<s;++n){o=n,a=r(n);for(;o>0&&e(i[o],i[a])<0;o=a,a=r(o))u(o,a)}return i.length},this.shift=function(){return f(0)},this.__defineGetter__("length",function(){return i.length});for(var c=r(i.length-1);c>=0;--c)a(c)};var i=e.max_first=function(t,n){return n-t},s=e.min_first=function(t,n){return t-n}})(),define("lib/priority_queue",function(e){return function(){var t,n;return t||e.priority_queue}}(this)),define("graph_search/frontier",["lib/priority_queue"],function(e){var t=function(){this._queue=e.PriorityQueue(function(e,t){return e.priority()-t.priority()}),this._states={}};return t.prototype.pop=function(){var e=this._queue.shift();return e?(delete this._states[e.state],e):null},t.prototype.top=function(){var e=this.pop();return e?(this.add(e),e):null},t.prototype.getNodeWithState=function(e){var t=this._states[e];return t!==undefined?t:null},t.prototype.add=function(e){if(this._states[e.state]!==undefined)throw new Error("Node with state "+e.state+" already exists in the frontier");return this._queue.push(e),this._states[e.state]=e,this},t.prototype.delete=function(e){return this._queue.deleteAll(function(t){return t.state===e.state}),delete this._states[e.state],this},t.prototype.isEmpty=function(){return this._queue.length===0},t}),function(){var e=this,t=e._,n={},r=Array.prototype,i=Object.prototype,s=Function.prototype,o=r.push,u=r.slice,a=r.concat,f=i.toString,l=i.hasOwnProperty,c=r.forEach,h=r.map,p=r.reduce,d=r.reduceRight,v=r.filter,m=r.every,g=r.some,y=r.indexOf,b=r.lastIndexOf,w=Array.isArray,E=Object.keys,S=s.bind,x=function(e){return e instanceof x?e:this instanceof x?void (this._wrapped=e):new x(e)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=x),exports._=x):e._=x,x.VERSION="1.6.0";var T=x.each=x.forEach=function(e,t,r){if(null==e)return e;if(c&&e.forEach===c)e.forEach(t,r);else if(e.length===+e.length){for(var i=0,s=e.length;s>i;i++)if(t.call(r,e[i],i,e)===n)return}else for(var o=x.keys(e),i=0,s=o.length;s>i;i++)if(t.call(r,e[o[i]],o[i],e)===n)return;return e};x.map=x.collect=function(e,t,n){var r=[];return null==e?r:h&&e.map===h?e.map(t,n):(T(e,function(e,i,s){r.push(t.call(n,e,i,s))}),r)};var N="Reduce of empty array with no initial value";x.reduce=x.foldl=x.inject=function(e,t,n,r){var i=arguments.length>2;if(null==e&&(e=[]),p&&e.reduce===p)return r&&(t=x.bind(t,r)),i?e.reduce(t,n):e.reduce(t);if(T(e,function(e,s,o){i?n=t.call(r,n,e,s,o):(n=e,i=!0)}),!i)throw new TypeError(N);return n},x.reduceRight=x.foldr=function(e,t,n,r){var i=arguments.length>2;if(null==e&&(e=[]),d&&e.reduceRight===d)return r&&(t=x.bind(t,r)),i?e.reduceRight(t,n):e.reduceRight(t);var s=e.length;if(s!==+s){var o=x.keys(e);s=o.length}if(T(e,function(u,a,f){a=o?o[--s]:--s,i?n=t.call(r,n,e[a],a,f):(n=e[a],i=!0)}),!i)throw new TypeError(N);return n},x.find=x.detect=function(e,t,n){var r;return C(e,function(e,i,s){return t.call(n,e,i,s)?(r=e,!0):void 0}),r},x.filter=x.select=function(e,t,n){var r=[];return null==e?r:v&&e.filter===v?e.filter(t,n):(T(e,function(e,i,s){t.call(n,e,i,s)&&r.push(e)}),r)},x.reject=function(e,t,n){return x.filter(e,function(e,r,i){return!t.call(n,e,r,i)},n)},x.every=x.all=function(e,t,r){t||(t=x.identity);var i=!0;return null==e?i:m&&e.every===m?e.every(t,r):(T(e,function(e,s,o){return(i=i&&t.call(r,e,s,o))?void 0:n}),!!i)};var C=x.some=x.any=function(e,t,r){t||(t=x.identity);var i=!1;return null==e?i:g&&e.some===g?e.some(t,r):(T(e,function(e,s,o){return i||(i=t.call(r,e,s,o))?n:void 0}),!!i)};x.contains=x.include=function(e,t){return null==e?!1:y&&e.indexOf===y?e.indexOf(t)!=-1:C(e,function(e){return e===t})},x.invoke=function(e,t){var n=u.call(arguments,2),r=x.isFunction(t);return x.map(e,function(e){return(r?t:e[t]).apply(e,n)})},x.pluck=function(e,t){return x.map(e,x.property(t))},x.where=function(e,t){return x.filter(e,x.matches(t))},x.findWhere=function(e,t){return x.find(e,x.matches(t))},x.max=function(e,t,n){if(!t&&x.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.max.apply(Math,e);var r=-1/0,i=-1/0;return T(e,function(e,s,o){var u=t?t.call(n,e,s,o):e;u>i&&(r=e,i=u)}),r},x.min=function(e,t,n){if(!t&&x.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.min.apply(Math,e);var r=1/0,i=1/0;return T(e,function(e,s,o){var u=t?t.call(n,e,s,o):e;i>u&&(r=e,i=u)}),r},x.shuffle=function(e){var t,n=0,r=[];return T(e,function(e){t=x.random(n++),r[n-1]=r[t],r[t]=e}),r},x.sample=function(e,t,n){return null==t||n?(e.length!==+e.length&&(e=x.values(e)),e[x.random(e.length-1)]):x.shuffle(e).slice(0,Math.max(0,t))};var k=function(e){return null==e?x.identity:x.isFunction(e)?e:x.property(e)};x.sortBy=function(e,t,n){return t=k(t),x.pluck(x.map(e,function(e,r,i){return{value:e,index:r,criteria:t.call(n,e,r,i)}}).sort(function(e,t){var n=e.criteria,r=t.criteria;if(n!==r){if(n>r||n===void 0)return 1;if(r>n||r===void 0)return-1}return e.index-t.index}),"value")};var L=function(e){return function(t,n,r){var i={};return n=k(n),T(t,function(s,o){var u=n.call(r,s,o,t);e(i,u,s)}),i}};x.groupBy=L(function(e,t,n){x.has(e,t)?e[t].push(n):e[t]=[n]}),x.indexBy=L(function(e,t,n){e[t]=n}),x.countBy=L(function(e,t){x.has(e,t)?e[t]++:e[t]=1}),x.sortedIndex=function(e,t,n,r){n=k(n);for(var i=n.call(r,t),s=0,o=e.length;o>s;){var u=s+o>>>1;n.call(r,e[u])<i?s=u+1:o=u}return s},x.toArray=function(e){return e?x.isArray(e)?u.call(e):e.length===+e.length?x.map(e,x.identity):x.values(e):[]},x.size=function(e){return null==e?0:e.length===+e.length?e.length:x.keys(e).length},x.first=x.head=x.take=function(e,t,n){return null==e?void 0:null==t||n?e[0]:0>t?[]:u.call(e,0,t)},x.initial=function(e,t,n){return u.call(e,0,e.length-(null==t||n?1:t))},x.last=function(e,t,n){return null==e?void 0:null==t||n?e[e.length-1]:u.call(e,Math.max(e.length-t,0))},x.rest=x.tail=x.drop=function(e,t,n){return u.call(e,null==t||n?1:t)},x.compact=function(e){return x.filter(e,x.identity)};var A=function(e,t,n){return t&&x.every(e,x.isArray)?a.apply(n,e):(T(e,function(e){x.isArray(e)||x.isArguments(e)?t?o.apply(n,e):A(e,t,n):n.push(e)}),n)};x.flatten=function(e,t){return A(e,t,[])},x.without=function(e){return x.difference(e,u.call(arguments,1))},x.partition=function(e,t){var n=[],r=[];return T(e,function(e){(t(e)?n:r).push(e)}),[n,r]},x.uniq=x.unique=function(e,t,n,r){x.isFunction(t)&&(r=n,n=t,t=!1);var i=n?x.map(e,n,r):e,s=[],o=[];return T(i,function(n,r){(t?r&&o[o.length-1]===n:x.contains(o,n))||(o.push(n),s.push(e[r]))}),s},x.union=function(){return x.uniq(x.flatten(arguments,!0))},x.intersection=function(e){var t=u.call(arguments,1);return x.filter(x.uniq(e),function(e){return x.every(t,function(t){return x.contains(t,e)})})},x.difference=function(e){var t=a.apply(r,u.call(arguments,1));return x.filter(e,function(e){return!x.contains(t,e)})},x.zip=function(){for(var e=x.max(x.pluck(arguments,"length").concat(0)),t=new Array(e),n=0;e>n;n++)t[n]=x.pluck(arguments,""+n);return t},x.object=function(e,t){if(null==e)return{};for(var n={},r=0,i=e.length;i>r;r++)t?n[e[r]]=t[r]:n[e[r][0]]=e[r][1];return n},x.indexOf=function(e,t,n){if(null==e)return-1;var r=0,i=e.length;if(n){if("number"!=typeof n)return r=x.sortedIndex(e,t),e[r]===t?r:-1;r=0>n?Math.max(0,i+n):n}if(y&&e.indexOf===y)return e.indexOf(t,n);for(;i>r;r++)if(e[r]===t)return r;return-1},x.lastIndexOf=function(e,t,n){if(null==e)return-1;var r=null!=n;if(b&&e.lastIndexOf===b)return r?e.lastIndexOf(t,n):e.lastIndexOf(t);for(var i=r?n:e.length;i--;)if(e[i]===t)return i;return-1},x.range=function(e,t,n){arguments.length<=1&&(t=e||0,e=0),n=arguments[2]||1;for(var r=Math.max(Math.ceil((t-e)/n),0),i=0,s=new Array(r);r>i;)s[i++]=e,e+=n;return s};var O=function(){};x.bind=function(e,t){var n,r;if(S&&e.bind===S)return S.apply(e,u.call(arguments,1));if(!x.isFunction(e))throw new TypeError;return n=u.call(arguments,2),r=function(){if(this instanceof r){O.prototype=e.prototype;var i=new O;O.prototype=null;var s=e.apply(i,n.concat(u.call(arguments)));return Object(s)===s?s:i}return e.apply(t,n.concat(u.call(arguments)))}},x.partial=function(e){var t=u.call(arguments,1);return function(){for(var n=0,r=t.slice(),i=0,s=r.length;s>i;i++)r[i]===x&&(r[i]=arguments[n++]);for(;n<arguments.length;)r.push(arguments[n++]);return e.apply(this,r)}},x.bindAll=function(e){var t=u.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return T(t,function(t){e[t]=x.bind(e[t],e)}),e},x.memoize=function(e,t){var n={};return t||(t=x.identity),function(){var r=t.apply(this,arguments);return x.has(n,r)?n[r]:n[r]=e.apply(this,arguments)}},x.delay=function(e,t){var n=u.call(arguments,2);return setTimeout(function(){return e.apply(null,n)},t)},x.defer=function(e){return x.delay.apply(x,[e,1].concat(u.call(arguments,1)))},x.throttle=function(e,t,n){var r,i,s,o=null,u=0;n||(n={});var a=function(){u=n.leading===!1?0:x.now(),o=null,s=e.apply(r,i),r=i=null};return function(){var f=x.now();u||n.leading!==!1||(u=f);var l=t-(f-u);return r=this,i=arguments,0>=l?(clearTimeout(o),o=null,u=f,s=e.apply(r,i),r=i=null):o||n.trailing===!1||(o=setTimeout(a,l)),s}},x.debounce=function(e,t,n){var r,i,s,o,u,a=function(){var f=x.now()-o;t>f?r=setTimeout(a,t-f):(r=null,n||(u=e.apply(s,i),s=i=null))};return function(){s=this,i=arguments,o=x.now();var f=n&&!r;return r||(r=setTimeout(a,t)),f&&(u=e.apply(s,i),s=i=null),u}},x.once=function(e){var t,n=!1;return function(){return n?t:(n=!0,t=e.apply(this,arguments),e=null,t)}},x.wrap=function(e,t){return x.partial(t,e)},x.compose=function(){var e=arguments;return function(){for(var t=arguments,n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},x.after=function(e,t){return function(){return--e<1?t.apply(this,arguments):void 0}},x.keys=function(e){if(!x.isObject(e))return[];if(E)return E(e);var t=[];for(var n in e)x.has(e,n)&&t.push(n);return t},x.values=function(e){for(var t=x.keys(e),n=t.length,r=new Array(n),i=0;n>i;i++)r[i]=e[t[i]];return r},x.pairs=function(e){for(var t=x.keys(e),n=t.length,r=new Array(n),i=0;n>i;i++)r[i]=[t[i],e[t[i]]];return r},x.invert=function(e){for(var t={},n=x.keys(e),r=0,i=n.length;i>r;r++)t[e[n[r]]]=n[r];return t},x.functions=x.methods=function(e){var t=[];for(var n in e)x.isFunction(e[n])&&t.push(n);return t.sort()},x.extend=function(e){return T(u.call(arguments,1),function(t){if(t)for(var n in t)e[n]=t[n]}),e},x.pick=function(e){var t={},n=a.apply(r,u.call(arguments,1));return T(n,function(n){n in e&&(t[n]=e[n])}),t},x.omit=function(e){var t={},n=a.apply(r,u.call(arguments,1));for(var i in e)x.contains(n,i)||(t[i]=e[i]);return t},x.defaults=function(e){return T(u.call(arguments,1),function(t){if(t)for(var n in t)e[n]===void 0&&(e[n]=t[n])}),e},x.clone=function(e){return x.isObject(e)?x.isArray(e)?e.slice():x.extend({},e):e},x.tap=function(e,t){return t(e),e};var M=function(e,t,n,r){if(e===t)return 0!==e||1/e==1/t;if(null==e||null==t)return e===t;e instanceof x&&(e=e._wrapped),t instanceof x&&(t=t._wrapped);var i=f.call(e);if(i!=f.call(t))return!1;switch(i){case"[object String]":return e==String(t);case"[object Number]":return e!=+e?t!=+t:0==e?1/e==1/t:e==+t;case"[object Date]":case"[object Boolean]":return+e==+t;case"[object RegExp]":return e.source==t.source&&e.global==t.global&&e.multiline==t.multiline&&e.ignoreCase==t.ignoreCase}if("object"!=typeof e||"object"!=typeof t)return!1;for(var s=n.length;s--;)if(n[s]==e)return r[s]==t;var o=e.constructor,u=t.constructor;if(o!==u&&!(x.isFunction(o)&&o instanceof o&&x.isFunction(u)&&u instanceof u)&&"constructor"in e&&"constructor"in t)return!1;n.push(e),r.push(t);var a=0,l=!0;if("[object Array]"==i){if(a=e.length,l=a==t.length)for(;a--&&(l=M(e[a],t[a],n,r)););}else{for(var c in e)if(x.has(e,c)&&(a++,!(l=x.has(t,c)&&M(e[c],t[c],n,r))))break;if(l){for(c in t)if(x.has(t,c)&&!(a--))break;l=!a}}return n.pop(),r.pop(),l};x.isEqual=function(e,t){return M(e,t,[],[])},x.isEmpty=function(e){if(null==e)return!0;if(x.isArray(e)||x.isString(e))return 0===e.length;for(var t in e)if(x.has(e,t))return!1;return!0},x.isElement=function(e){return!!e&&1===e.nodeType},x.isArray=w||function(e){return"[object Array]"==f.call(e)},x.isObject=function(e){return e===Object(e)},T(["Arguments","Function","String","Number","Date","RegExp"],function(e){x["is"+e]=function(t){return f.call(t)=="[object "+e+"]"}}),x.isArguments(arguments)||(x.isArguments=function(e){return!!e&&!!x.has(e,"callee")}),"function"!=typeof /./&&(x.isFunction=function(e){return"function"==typeof e}),x.isFinite=function(e){return isFinite(e)&&!isNaN(parseFloat(e))},x.isNaN=function(e){return x.isNumber(e)&&e!=+e},x.isBoolean=function(e){return e===!0||e===!1||"[object Boolean]"==f.call(e)},x.isNull=function(e){return null===e},x.isUndefined=function(e){return e===void 0},x.has=function(e,t){return l.call(e,t)},x.noConflict=function(){return e._=t,this},x.identity=function(e){return e},x.constant=function(e){return function(){return e}},x.property=function(e){return function(t){return t[e]}},x.matches=function(e){return function(t){if(t===e)return!0;for(var n in e)if(e[n]!==t[n])return!1;return!0}},x.times=function(e,t,n){for(var r=Array(Math.max(0,e)),i=0;e>i;i++)r[i]=t.call(n,i);return r},x.random=function(e,t){return null==t&&(t=e,e=0),e+Math.floor(Math.random()*(t-e+1))},x.now=Date.now||function(){return(new Date).getTime()};var _={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};_.unescape=x.invert(_.escape);var D={escape:new RegExp("["+x.keys(_.escape).join("")+"]","g"),unescape:new RegExp("("+x.keys(_.unescape).join("|")+")","g")};x.each(["escape","unescape"],function(e){x[e]=function(t){return null==t?"":(""+t).replace(D[e],function(t){return _[e][t]})}}),x.result=function(e,t){if(null==e)return void 0;var n=e[t];return x.isFunction(n)?n.call(e):n},x.mixin=function(e){T(x.functions(e),function(t){var n=x[t]=e[t];x.prototype[t]=function(){var e=[this._wrapped];return o.apply(e,arguments),F.call(this,n.apply(x,e))}})};var P=0;x.uniqueId=function(e){var t=++P+"";return e?e+t:t},x.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var H=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","   ":"t","\u2028":"u2028","\u2029":"u2029"},j=/\\|'|\r|\n|\t|\u2028|\u2029/g;x.template=function(e,t,n){var r;n=x.defaults({},n,x.templateSettings);var i=new RegExp([(n.escape||H).source,(n.interpolate||H).source,(n.evaluate||H).source].join("|")+"|$","g"),s=0,o="__p+='";e.replace(i,function(t,n,r,i,u){return o+=e.slice(s,u).replace(j,function(e){return"\\"+B[e]}),n&&(o+="'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'"),r&&(o+="'+\n((__t=("+r+"))==null?'':__t)+\n'"),i&&(o+="';\n"+i+"\n__p+='"),s=u+t.length,t}),o+="';\n",n.variable||(o="with(obj||{}){\n"+o+"}\n"),o="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+o+"return __p;\n";try{r=new Function(n.variable||"obj","_",o)}catch(u){throw u.source=o,u}if(t)return r(t,x);var a=function(e){return r.call(this,e,x)};return a.source="function("+(n.variable||"obj")+"){\n"+o+"}",a},x.chain=function(e){return x(e).chain()};var F=function(e){return this._chain?x(e).chain():e};x.mixin(x),T(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var t=r[e];x.prototype[e]=function(){var n=this._wrapped;return t.apply(n,arguments),"shift"!=e&&"splice"!=e||0!==n.length||delete n[0],F.call(this,n)}}),T(["concat","join","slice"],function(e){var t=r[e];x.prototype[e]=function(){return F.call(this,t.apply(this._wrapped,arguments))}}),x.extend(x.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}}),"function"==typeof define&&define.amd&&define("underscore",[],function(){return x})}.call(this),define("lib/underscore",function(e){return function(){var t,n;return t||e._}}(this)),define("graph_search/node",["lib/underscore","graph_search/frontier"],function(e,t){var n=function(t){t=t||{},e.each(["problem","state","action","parent","pathCost"],function(e){if(t[e]===undefined)throw new Error("Missing option "+e+" for node constructor")}),this.problem=t.problem,this.state=t.state,this.action=t.action,this.parent=t.parent,this.pathCost=t.pathCost};return n.initialNode=function(e){return new n({problem:e,state:e.initialState,pathCost:0,parent:null,action:null})},n.prototype.child=function(e){var t=this.problem.result(this.state,e),r=this.pathCost+this.problem.stepCost(this.state,e);return new n({problem:this.problem,state:t,parent:this,action:e,pathCost:r})},n.prototype.priority=function(){return this.pathCost+this.problem.goalDistanceHeuristic(this.state)},n.prototype.path=function(){var e=[],t=this;while(t)e.push(t),t=t.parent;return e.reverse()},n}),define("graph_search/solvers/cheapest_first_search",["lib/underscore","graph_search/frontier","graph_search/node"],function(e,t,n){var r=function(e){var r=n.initialNode(e);this.problem=e,this.frontier=new t,this.frontier.add(r),this.exploredSet={}};return r.prototype.solve=function(){var t,n,r=this;for(;;){if(this.frontier.isEmpty())return null;t=this.frontier.pop();if(this.problem.goalReached(t.state))return t.path();this.exploredSet[t.state]=!0,e.each(this.problem.possibleActions(t.state),function(e){var n=t.child(e),i=r.frontier.getNodeWithState(n.state);!i&&!r.exploredSet[n.state]?r.frontier.add(n):i&&i.priority>n.priority&&(r.frontier.delete(n),r.frontier.add(n))})}},r}),define("graph_search/problems/sliding_tile_puzzle",["lib/underscore"],function(e){var t=function(e,t){this.size=e||3,this.initialState=t||this._goalState()};return t.RANDOM_ITERATIONS=100,t.prototype.shuffle=function(){return this.initialState=this._randomState(),this},t.prototype.possibleActions=function(e){var t=[],n,r,i;return n=this._blankCoordinate(e),r=n[0],i=n[1],i<this.size&&t.push("up"),i>1&&t.push("down"),r<this.size&&t.push("left"),r>1&&t.push("right"),t},t.prototype.result=function(t,n){var r,i,s,o,u,a,f,l;r=this._blankCoordinate(t),i=r[0],s=r[1];switch(n){case"left":o=i+1,u=s;break;case"right":o=i-1,u=s;break;case"up":o=i,u=s+1;break;case"down":o=i,u=s-1}return a=this._blankIndex(t),f=this._coordinateToIndex(o,u),l=e.clone(t),l[f]=t[a],l[a]=t[f],l},t.prototype.stepCost=function(e,t){return 1},t.prototype.goalReached=function(e){return e.join(",")===this._goalState().join(",")},t.prototype.goalDistanceHeuristic=function(t){var n=0,r=this,i,s,o,u,a,f;return e.each(t,function(e,t){if(e===null)return;i=r._indexToCoordinate(t),s=i[0],o=i[1],u=r._indexToCoordinate(e-1),a=u[0],f=u[1],n+=Math.abs(a-s)+Math.abs(f-o)}),n},t.prototype._randomState=function(){var n=this._goalState(),r=this,i,s;return e(t.RANDOM_ITERATIONS).times(function(){s=r.possibleActions(n),i=s[e.random(s.length-1)],n=r.result(n,i)}),n},t.prototype._goalState=function(){var t=[];return e(Math.pow(this.size,2)-1).times(function(e){t.push(e+1)}),t.push(null),t},t.prototype._blankCoordinate=function(e){return this._indexToCoordinate(this._blankIndex(e))},t.prototype._blankIndex=function(t){return e.indexOf(t,null)},t.prototype._indexToCoordinate=function(e){var t=e%this.size+1,n=Math.floor(e/this.size)+1;return[t,n]},t.prototype._coordinateToIndex=function(e,t){return(t-1)*this.size+(e-1)},t}),require(["graph_search/frontier","graph_search/node","graph_search/solvers/cheapest_first_search","graph_search/problems/sliding_tile_puzzle"],function(){}),define("graph_search_main",function(){});