import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useState, FC} from 'react';

import {getPlayer, AudioPlayerSong, Playlist} from '../audioPlayer';
import {usePlayback} from '../utils';


export interface PlayButtonProps {
  playlist: Playlist;
  size?: 'small' | 'medium' | 'large';
  song?: AudioPlayerSong;
}

export const PlayButton: FC<PlayButtonProps> = ({playlist, size, song}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const player = getPlayer();
  const playbackState = usePlayback(player, false);

  const openMenu = (e: React.MouseEvent<any>) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const play = () => {
    player.setPlaylist(playlist);
    player.play(song);
  };

  const playNext = () => {
    if (song) {
      player.addSong(song, player.currentSong + 1);
    } else {
      player.addPlaylist(playlist, player.currentSong + 1);
    }
  };

  const addSong = () => {
    if (song) {
      player.addSong(song);
    } else {
      player.addPlaylist(playlist);
    }
  };

  return playbackState.playing ? (
    <>
      <Button
        variant='contained'
        color='secondary'
        size={size}
        aria-controls='playbutton-menu'
        aria-haspopup='true'
        onClick={openMenu}
      >
        Play...
      </Button>
      <Menu
        id='playbutton-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={play}>Play</MenuItem>
        <MenuItem onClick={playNext}>Play next</MenuItem>
        <MenuItem onClick={addSong}>Add to playlist</MenuItem>
      </Menu>
    </>
  ) : (
    <Button
      variant='contained'
      color='secondary'
      size={size}
      onClick={play}
    >
      Play
    </Button>
  );
};
