require(["jquery", "ui/sliding_tile_puzzle"], function($, SlidingTilePuzzle){
  var puzzle = new SlidingTilePuzzle("puzzle");
  $("#shuffle").click(function(){
    puzzle.shuffle();
  });
  $("#solve").click(function(){
    puzzle.solve();
  });
});
