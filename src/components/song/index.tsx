import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import PauseIcon from '@material-ui/icons/Pause';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import {useRouter} from 'next/router';
import {useEffect, useState, FC} from 'react';

import {createPlaylistFromAlbum, createSong, getPlayer, Playlist, songMatcher} from '../../audioPlayer';
import {Album, Category, Song as SongType} from '../../data/types';
import {formatTime, usePlayback} from '../../utils';
import {SongInfo} from './info';


const useStyles = makeStyles(theme => ({
  index: {
    width: 48,
    textAlign: 'center'
  },

  artist: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },

  download: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  }
}));

export interface SongProps {
  playIndex: number;
  category: Category;
  album: Album;
  song: SongType;
  playlist?: Playlist;
  active?: boolean;
  noInfoRouting?: boolean;
}

interface CellProps extends SongProps {
  hover: boolean;
}


export const Song: FC<SongProps> = (props) => {
  const {playIndex, category, album, song, playlist, active, noInfoRouting} = props;
  const classes = useStyles();
  const [hover, setHover] = useState<boolean>(false);

  return (
    <TableRow onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <TableCell>
        <PlaybackCell {...props} hover={hover} />
      </TableCell>
      <TableCell>
        <Typography variant='h6' noWrap>{song.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography className={classes.artist} noWrap>{song.artist}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{formatTime(song.duration)}</Typography>
      </TableCell>
      <TableCell>
        <MoreCell {...props} hover={hover} />
      </TableCell>
    </TableRow>
  );
}

const PlaybackCell: FC<CellProps> = ({category, album, song, playlist, playIndex, hover}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const playerSong = createSong(category, album, song);

  const player = getPlayer();
  const playbackState = usePlayback(player, false);

  const isCurrentSong = player.isPlaying(playerSong);
  const isPlaying = playbackState.playing;

  const play = () => {
    player.setPlaylist(playlist || createPlaylistFromAlbum(category, album));
    player.play(playerSong);
    closeMenu();
  };
  const pause = () => player.pause();
  const playNext = () => {
    player.addSong(playerSong, player.currentSong + 1);
    closeMenu();
  };
  const addSong = () => {
    player.addSong(playerSong);
    closeMenu();
  };

  const openMenu = (e: React.MouseEvent<any>) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  return (
    <>
      {(!isPlaying && hover) ? (
        <Tooltip title='Play'>
          <IconButton aria-label='play song' onClick={play}>
            <PlayArrowIcon />
          </IconButton>
        </Tooltip>
      ) : (isPlaying && isCurrentSong) ? (
        <Tooltip title='Pause'>
          <IconButton aria-label='pause song' onClick={pause}>
            <PauseIcon />
          </IconButton>
        </Tooltip>
      ) : (isPlaying && hover && !isCurrentSong) ? (
        <Tooltip title='Add to Playlist'>
          <IconButton
            aria-label='add song to playlist'
            aria-controls='play-options-menu'
            aria-haspopup='true'
            onClick={openMenu}
          >
            <QueueMusicIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Typography className={classes.index} variant='h6'>{playIndex}.</Typography>
      )}
      <Menu
        id='play-options-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={play}><PlayArrowIcon /> &nbsp; Play now</MenuItem>
        <MenuItem onClick={playNext}><PlaylistPlayIcon /> &nbsp; Play next</MenuItem>
        <MenuItem onClick={addSong}><PlaylistAddIcon /> &nbsp; Add to playlist</MenuItem>
      </Menu>
    </>
  );
};

const MoreCell: FC<CellProps> = ({active, noInfoRouting, category, album, song}) => {
  const classes = useStyles();
  const [showInfo, setShowInfo] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (active !== undefined) {
      setShowInfo(active);
    }
  }, [active]);

  const openInfo = () => {
    if (!noInfoRouting) {
      router.replace(router.pathname, `/albums/${category.link}/${album.link}?song=${song.link}`, {
        shallow: true
      });
    }
    setShowInfo(true);
  };
  const closeInfo = () => {
    if (!noInfoRouting) {
      router.replace(router.pathname, `/albums/${category.link}/${album.link}`, {
        shallow: true
      });
    }
    setShowInfo(false);
  };

  return (
    <div>
      <Tooltip title='Song Info'>
        <IconButton
          aria-label='song info'
          onClick={openInfo}
        >
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <SongInfo open={showInfo} category={category} album={album} song={song} handleClose={closeInfo} />

      <Tooltip className={classes.download} title='Download Song'>
        <IconButton
          aria-label='download song'
          component='a'
          href={song.music}
          download={song.fileName}
        >
          <SaveAltIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};
