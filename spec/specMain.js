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
    graph_search: '../src/graph_search',
    graph_search_spec: './graph_search',
    lib: '../lib'
  }
});


require([
  "graph_search_spec/FrontierSpec",
  "graph_search_spec/NodeSpec",
  "graph_search_spec/solver/cheapest_first_search_spec"
  ], function () {
	window.executeTests();
});
