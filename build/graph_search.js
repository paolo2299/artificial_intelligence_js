({
  shim: {
    'priority_queue': {
      exports: 'priority_queue'
    }
  },
  paths : {
    graph_search: '../src/graph_search',
    underscore: 'empty:',
    priority_queue: '../lib/priority_queue'
  },
  name: 'graph_search_main',
  out: '../graph_search.js'  
})
