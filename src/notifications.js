import {getPlayer, AudioPlayer} from './audioPlayer';


/*
const notificationActions = [AudioPlayer.actions.PLAY, AudioPlayer.actions.NEXT, AudioPlayer.actions.PREVIOUS];

// TODO: Make happen when player gets created
if (typeof window !== 'undefined' && window.Notification) {
  const player = getPlayer();
  player.addListener(action => {
    if (notificationActions.includes(action)) {
      Notification.requestPermission()
        .then(permission => {
          if (permission === 'granted') {
            const n = new Notification(player.song.name, {
              body: player.song.album.name + ' - ' + player.song.artist,
              image: player.song.album.art,
              silent: true
            })
          }
        });
    }
  });
}

*/
