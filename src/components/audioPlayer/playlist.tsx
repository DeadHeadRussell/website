import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import {useRouter} from 'next/router';
import {useState, FC} from 'react';

import {AudioPlayer, AudioPlayerSong} from '../../audioPlayer';
import {PlaybackState} from '../../utils';
import {AlbumIcon} from '../album/icon';
import {AlbumLink} from '../album/link';
import {AudioPlayerSongDisplay} from './songDisplay';


const useStyles = makeStyles(theme => ({
  playlist: {
    maxWidth: 800,
    maxHeight: 600,
    padding: theme.spacing(2),
    paddingBottom: 0
  }
}));

export interface AudioPlayerPlaylistProps {
  player: AudioPlayer;
  playbackState: PlaybackState;
}

export const AudioPlayerPlaylist: FC<AudioPlayerPlaylistProps> = ({player, playbackState}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const classes = useStyles();

  const toggleOpen = (e: React.MouseEvent<any>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const play = (song: AudioPlayerSong) => () => {
    player.play(song);
  };

  const pause = () => player.pause();

  const remove = (index: number) => () => {
    player.removeSong(index);
  };

  const clear = () => {
    player.setPlaylist([]);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'playlist-popover' : undefined;

  return (
    <>
      <Tooltip title='Current Playlist'>
        <IconButton
          aria-label='view playlist'
          aria-described-by={id}
          onClick={toggleOpen}
        >
          <QueueMusicIcon />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        classes={{paper: classes.playlist}}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
      >
        {playbackState.playlist.length > 0 ? (
					<Table size='small' padding='none'>
            <TableHead>
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography variant='h5'>Current Playlist</Typography>
                </TableCell>
                <TableCell>
                  <Button onClick={clear}>Clear</Button>
                </TableCell>
              </TableRow>
            </TableHead>
						<TableBody>
              {playbackState.playlist.map((song, index) => (
                <TableRow>
                  <TableCell>
                    {(index === playbackState.currentSong && playbackState.playing) ? (
                      <IconButton aria-label='pause song' onClick={pause}>
                        <PauseIcon />
                      </IconButton>
                    ) : (
                      <IconButton aria-label='play song' onClick={play(song)}>
                        <PlayArrowIcon />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell padding='checkbox'>{index + 1}.</TableCell>
                  <TableCell>
                    <AudioPlayerSongDisplay song={song} alwaysShowArt={true} />
                  </TableCell>
                  <TableCell>
                    <Tooltip title='Remove from playlist'>
                      <IconButton aria-label='remove from playlist' onClick={remove(index)}>
                        <ClearIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography variant='body1'>Play an album or a song to add to this playlist!</Typography>
        )}
      </Popover>
    </>
  );
};
