import {AudioPlayer, AudioPlayerSong, Action} from './audioPlayer';

export function createNotifications(player: AudioPlayer): void {
  const notificationActions: Action[] = [player.actions.PLAY, player.actions.NEXT, player.actions.PREVIOUS];
  if (typeof window !== 'undefined' && window.Notification) {
    player.addListener(action => {
      if (notificationActions.includes(action) && player.song) {
        const song: AudioPlayerSong = player.song;
        Notification.requestPermission()
          .then(permission => {
            if (permission === 'granted') {
              const n = new Notification(song.name, {
                body: song.album.name + ' - ' + song.artist,
                image: song.album.art,
                silent: true
              })
            }
          });
      }
    });
  }
}

