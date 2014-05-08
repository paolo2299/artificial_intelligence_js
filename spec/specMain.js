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
    lib: '../lib'
  }
});


require([
  "graph_search_spec/frontier_spec",
  "graph_search_spec/node_spec",
  "graph_search_spec/solvers_spec/cheapest_first_search_spec",
  "graph_search_spec/problems_spec/sliding_tile_puzzle_spec"
  ], function () {
	window.executeTests();
});
