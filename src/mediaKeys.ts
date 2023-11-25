import {AudioPlayer} from './audioPlayer';
import {staticLink} from './utils';

/*
declare global {
  interface MediaSession {
    setPositionState: (a: any) => void;
  }
}
 */

export function setupMediaKeys(player: AudioPlayer) {
  if (typeof window !== 'undefined' && window.navigator.mediaSession) {
    const mediaSession: MediaSession = window.navigator.mediaSession;
    player.addListener(() => {
      if (player.song) {
        mediaSession.metadata = new MediaMetadata({
          title: player.song.name,
          artist: player.song.artist,
          album: player.song.album.name,
          artwork: [{src: staticLink(player.song.album.art), type: 'image/jpg'}]
        });

        mediaSession.setPositionState && mediaSession.setPositionState({
          duration: player.duration,
          playbackRate: player.playbackRate,
          position: player.currentTime
        });
      }
    });

    mediaSession.setActionHandler('play', () => {
      player.play();
      mediaSession.playbackState = 'playing';
    });

    mediaSession.setActionHandler('stop', () => {
      player.pause();
      mediaSession.playbackState = 'none';
    });

    mediaSession.setActionHandler('pause', () => {
      player.pause();
      mediaSession.playbackState = 'paused';
    });

    mediaSession.setActionHandler('previoustrack', () => player.previous());
    mediaSession.setActionHandler('nexttrack', () => player.next());
    mediaSession.setActionHandler('seekbackward', () => player.seekOffset(-10));
    mediaSession.setActionHandler('seekforward', () => player.seekOffset(10));
    // @ts-ignore
    mediaSession.setActionHandler('seekto', e => player.seek(e.seekTime));
  }
}
