({
  shim: {
    'priority_queue': {
      exports: 'priority_queue'
    }
  },
  paths : {
    graph_search: '../src/graph_search',
    underscore: 'empty:',
    jquery: 'empty:',
    priority_queue: '../lib/priority_queue',
    ui: '../src/ui'
  },
  name: 'graph_search_ui_main',
  out: '../graph_search_ui.js'  
})
