({
  shim: {
    'lib/underscore': {
      exports: '_'
    },
    'lib/priority_queue': {
      exports: 'priority_queue'
    }
  },
  paths : {
    graph_search: 'src/graph_search',
    lib: 'lib'
  },
  name: 'graph_search_main',
  out: 'graph_search.js'  
})
