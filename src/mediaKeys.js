import {globalPlayer} from './audioPlayer';

if (typeof window !== 'undefined' && window?.navigator?.mediaSession) {
  globalPlayer.addListener(() => {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: globalPlayer.song.name,
      artist: globalPlayer.song.artist,
      album: globalPlayer.song.album.name,
      artwork: [{src: globalPlayer.song.album.art, type: 'image/jpg'}]
    });

    navigator.mediaSession.setPositionState && navigator.mediaSession.setPositionState({
      duration: globalPlayer.duration,
      playbackRate: globalPlayer.playbackRate,
      position: globalPlayer.currentTime
    });
  });

  navigator.mediaSession.setActionHandler('play', () => {
    globalPlayer.play();
    navigator.mediaSession.playbackState = 'playing';
  });

  navigator.mediaSession.setActionHandler('stop', () => {
    globalPlayer.pause();
    navigator.mediaSession.playbackState = 'none';
  });

  navigator.mediaSession.setActionHandler('pause', () => {
    globalPlayer.pause();
    navigator.mediaSession.playbackState = 'paused';
  });

  navigator.mediaSession.setActionHandler('previoustrack', () => globalPlayer.previous());
  navigator.mediaSession.setActionHandler('nexttrack', () => globalPlayer.next());
  navigator.mediaSession.setActionHandler('seekbackward', () => globalPlayer.seekOffset(-10));
  navigator.mediaSession.setActionHandler('seekforward', () => globalPlayer.seekOffset(10));
  navigator.mediaSession.setActionHandler('seekto', e => globalPlayer.seek(e.seekTime));
}
