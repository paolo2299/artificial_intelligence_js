require.config({
  shim: {
    'priority_queue': {
      exports: 'priority_queue'
    }
  },
  paths : {
    graph_search: '../src/graph_search',
    discrete_local_search: '../src/discrete_local_search',
    games: '../src/games',
    underscore: '../lib/underscore',
    priority_queue: '../lib/priority_queue'
  }
});


require([
  "graph_search_spec/frontier_spec",
  "graph_search_spec/node_spec",
  "graph_search_spec/solvers_spec/cheapest_first_search_spec",
  "graph_search_spec/problems_spec/sliding_tile_puzzle_spec",
  "discrete_local_search_spec/problems_spec/queens_spec",
  "discrete_local_search_spec/solvers_spec/hill_climbing_steepest_ascent_spec",
  "discrete_local_search_spec/solvers_spec/hill_climbing_with_restarts_spec",
  "games_spec/problems_spec/tic_tac_toe_spec",
  "games_spec/solvers_spec/minimax_spec"
  ], function () {
	window.executeTests();
});
