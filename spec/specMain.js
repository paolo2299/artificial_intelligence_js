require.config({
  shim: {
    'lib/underscore': {
      exports: '_'
    },
    'lib/priority_queue': {
      exports: 'priority_queue'
    }
  },
  paths : {
    spec: 'jasmine-2.0.0/spec',
    src: '../src',
    lib: '../lib'
  }
});


require([
  "graph_search/FrontierSpec",
  "graph_search/NodeSpec"
  ], function () {
	window.executeTests();
});
