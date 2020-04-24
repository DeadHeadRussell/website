import net from 'idelic-safety-net';

function isPlaying(player, action) {
  return action === player.actions.PLAY || ((action === player.actions.NEXT || action === player.actions.PREVIOUS) && player.playing);
}

export function setupListensCount(player) {
  player.addListener(action => {
    if (isPlaying(player, action)) {
      net.post('/api/listens', {
        headers: {
          ['content-type']: 'application/json'
        },
        body: {
          album: player.song.album.link,
          song: player.song.link
        }
      });
    }
  });
}
