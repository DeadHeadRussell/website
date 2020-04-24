export function setupMediaKeys(player) {
  if (typeof window !== 'undefined' && window?.navigator?.mediaSession) {
    player.addListener(() => {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: player.song.name,
        artist: player.song.artist,
        album: player.song.album.name,
        artwork: [{src: player.song.album.art, type: 'image/jpg'}]
      });

      navigator.mediaSession.setPositionState && navigator.mediaSession.setPositionState({
        duration: player.duration,
        playbackRate: player.playbackRate,
        position: player.currentTime
      });
    });

    navigator.mediaSession.setActionHandler('play', () => {
      player.play();
      navigator.mediaSession.playbackState = 'playing';
    });

    navigator.mediaSession.setActionHandler('stop', () => {
      player.pause();
      navigator.mediaSession.playbackState = 'none';
    });

    navigator.mediaSession.setActionHandler('pause', () => {
      player.pause();
      navigator.mediaSession.playbackState = 'paused';
    });

    navigator.mediaSession.setActionHandler('previoustrack', () => player.previous());
    navigator.mediaSession.setActionHandler('nexttrack', () => player.next());
    navigator.mediaSession.setActionHandler('seekbackward', () => player.seekOffset(-10));
    navigator.mediaSession.setActionHandler('seekforward', () => player.seekOffset(10));
    navigator.mediaSession.setActionHandler('seekto', e => player.seek(e.seekTime));
  }
}
