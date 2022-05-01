import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import {useRouter} from 'next/router';
import {useState, FC} from 'react';

import {AudioPlayer, AudioPlayerSong, getPlayer} from '../../audioPlayer';
import {PlaybackState} from '../../utils';
import {AlbumIcon} from '../album/icon';
import {AudioPlayerSongDisplay} from './songDisplay';


const useStyles = makeStyles(theme => ({
  playlist: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      maxWidth: 1000,
      maxHeight: 800,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxHeight: '90%',
      margin: '0 auto'
    }
  },

  tableHead: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

export interface AudioPlayerPlaylistProps {
  player: AudioPlayer;
  playbackState: PlaybackState;
}

export const AudioPlayerPlaylist: FC<AudioPlayerPlaylistProps> = ({player, playbackState}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [repeatAnchorEl, setRepeatAnchorEl] = useState(null);
  const router = useRouter();
  const classes = useStyles();

  const toggleOpen = (e: React.MouseEvent<any>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const play = (index: number) => () => {
    player.playIndex(index);
  };

  const pause = () => player.pause();

  const remove = (index: number) => () => {
    player.removeSong(index);
  };

  const clear = () => {
    player.setPlaylist([]);
  };

  const repeatOff = () => {
    player.repeatOff();
    closeRepeatMenu();
  };

  const repeatOne = () => {
    player.repeatOne();
    closeRepeatMenu();
  };

  const repeatAll = () => {
    player.repeatAll();
    closeRepeatMenu();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'playlist-popover' : undefined;

  const openRepeatMenu = (e: React.MouseEvent<any>) => setRepeatAnchorEl(e.currentTarget);
  const closeRepeatMenu = () => setRepeatAnchorEl(null);

  return (
    <>
      <Tooltip title='Current Playlist'>
        <IconButton
          aria-label='view playlist'
          aria-describedby={id}
          onClick={toggleOpen}
        >
          <QueueMusicIcon />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        classes={{paper: classes.playlist}}
        style={{zIndex: 1310}}
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
                  <div className={classes.tableHead}>
                    <Typography variant='h5'>Current Playlist</Typography>
                    <Tooltip title='Repeat Menu'>
                      <IconButton aria-label='repeat options' onClick={openRepeatMenu}>
                        {player.repeat == 'one' ? (
                          <RepeatOneIcon color='secondary' />
                        ) : player.repeat == 'all' ? (
                          <RepeatIcon color='secondary' />
                        ) : (
                          <RepeatIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Menu
                      id='repeat-options-menu'
                      style={{zIndex: 1320}}
                      anchorEl={repeatAnchorEl}
                      keepMounted
                      open={Boolean(repeatAnchorEl)}
                      onClose={closeRepeatMenu}
                    >
                      <MenuItem onClick={repeatOff}><CancelOutlinedIcon /> &nbsp; Repeat Off</MenuItem>
                      <MenuItem onClick={repeatOne}><RepeatOneIcon /> &nbsp; Repeat One</MenuItem>
                      <MenuItem onClick={repeatAll}><RepeatIcon /> &nbsp; Repeat Playlist</MenuItem>
                    </Menu>
                  </div>
                </TableCell>
                <TableCell>
                  <Button onClick={clear}>Clear</Button>
                </TableCell>
              </TableRow>
            </TableHead>
						<TableBody>
              {playbackState.playlist.map((song, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {(index === playbackState.currentSong && playbackState.playing) ? (
                      <IconButton aria-label='pause song' onClick={pause}>
                        <PauseIcon />
                      </IconButton>
                    ) : (
                      <IconButton aria-label='play song' onClick={play(index)}>
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
