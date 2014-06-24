require(["jquery", "ui/maze"], function($, MazeUI){
  var maze = new MazeUI("maze", {height: 50, width: 50});
  $("#random").click(function(){
    $('#maze').html('');
    maze = new MazeUI("maze", {height: 50, width: 50});
  });
  $("#solve").click(function(){
    maze.solve();
  });
});
