define(['src/Player', 'src/Song', 'lib/underscore'], function(Player, Song, _) {

  describe("Player", function() {
  var player;
  var song;
  var x;


  beforeEach(function() {
    player = new Player();
    song = new Song();
    x = 0;
  });

  it("should be able to play a Song", function() {
    player.play(song);

    _.each([1,2,3], function(){x += 1;});
    expect(x).toEqual(3);
    expect(player.currentlyPlayingSong).toEqual(song);
  });

	describe("when song has been paused", function() {
	beforeEach(function() {
	player.play(song);
	player.pause();
	});

	it("should indicate that the song is currently paused", function() {
	expect(player.isPlaying).toBeFalsy();
	});

	it("should be possible to resume", function() {
	player.resume();
	expect(player.isPlaying).toBeTruthy();
	expect(player.currentlyPlayingSong).toEqual(song);
	});
	});

	// demonstrates use of spies to intercept and test method calls
	it("tells the current song if the user has made it a favorite", function() {
	spyOn(song, 'persistFavoriteStatus');

	player.play(song);
	player.makeFavorite();

	expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
	});

	//demonstrates use of expected exceptions
	describe("#resume", function() {
	it("should throw an exception if song is already playing", function() {
	player.play(song);

	expect(function() {
		player.resume();
	}).toThrowError("song is already playing");
	});
	});
	});
});
