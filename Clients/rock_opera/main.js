var current = 0;
var audioTag = document.getElementById('audio');
var statusTag = document.getElementById('status');
var songsTags = document.getElementById('songs').children;
var errorTag = document.getElementById('error');

audioTag.addEventListener('ended', function(e) {
  play(current + 1);
});

audioTag.addEventListener('error', function(e) {
  errorTag.innerHTML = 'Error: Could not load audio :(';
});

function play(index) {
  errorTag.innerHTML = '';

  current = index;
  if (current < songsTags.length) {
    var src = 'data/audio/Solo Works/Rock Opera/' + getCurrentSongName() + '.mp3';
    audioTag.src = src;
    audioTag.load();
    audioTag.play();
    statusTag.innerHTML = 'Now Playing: ' + (current + 1) + '. ' + getCurrentSongName();
  }

  for (var i = 0; i < songsTags.length; i++) {
    songsTags[i].className = 'song';
    if (i == current) {
      songsTags[i].className = 'song current';
    }
  }
}

function getCurrentSongName() {
  if (songsTags[current].dataset) {
    return songsTags[current].dataset.songName;
  }
  return songsTags[current].getAttribute('data-song-name');
}

