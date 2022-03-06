import net from 'idelic-safety-net';

import {AudioPlayer, Action} from './audioPlayer';

function isPlaying(player: AudioPlayer, action: Action): boolean {
  return action === player.actions.PLAY || ((action === player.actions.NEXT || action === player.actions.PREVIOUS) && player.playing);
}

export function setupListensCount(player: AudioPlayer): void {
  player.addListener(action => {
    if (isPlaying(player, action) && player.song) {
      net.post('/api/listens', {
        headers: {
          ['content-type']: 'application/json'
        },
        body: {
          category: player.song.category.link,
          album: player.song.album.link,
          song: player.song.link
        }
      });
    }
  });
}
