import {globalPlayer, AudioPlayer} from './audioPlayer';


const notificationActions = [AudioPlayer.actions.PLAY, AudioPlayer.actions.NEXT, AudioPlayer.actions.PREVIOUS];

if (typeof window !== 'undefined' && window.Notification) {
  globalPlayer.addListener(action => {
    if (notificationActions.includes(action)) {
      Notification.requestPermission()
        .then(permission => {
          if (permission === 'granted') {
            const n = new Notification(globalPlayer.song.name, {
              body: globalPlayer.song.album.name + ' - ' + globalPlayer.song.artist,
              image: globalPlayer.song.album.art,
              silent: true
            })
          }
        });
    }
  });
}

