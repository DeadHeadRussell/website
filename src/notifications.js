export function createNotifications(player) {
  const notificationActions = [player.actions.PLAY, player.actions.NEXT, player.actions.PREVIOUS];
  if (typeof window !== 'undefined' && window.Notification) {
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
}

