import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import {useRouter} from 'next/router';
import {useEffect, useState, FC} from 'react';

import {createPlaylistFromAlbum, createSong, getPlayer, Playlist, songMatcher} from '../../audioPlayer';
import {Album, Category, Song as SongType} from '../../data';
import {formatTime, usePlayback} from '../../utils';
import {SongInfo} from './info';


const useStyles = makeStyles(theme => ({
  dateCell: {
    whiteSpace: 'nowrap'
  }
}));

export interface SongProps {
  playIndex: number;
  category: Category;
  album: Album;
  song: SongType;
  playlist?: Playlist;
  active?: boolean;
  hideInfo?: boolean;
}

export const Song: FC<SongProps> = ({playIndex, category, album, song, playlist, active, hideInfo}) => {
  const classes = useStyles();

  const PlaybackCell = () => {
    const playerSong = createSong(category, album, song);

    const player = getPlayer();
    const playbackState = usePlayback(player, false);

    const isCurrentSong = player.isPlaying(playerSong);
    const pause = () => player.pause();
    const play = () => {
      player.setPlaylist(playlist || createPlaylistFromAlbum(category, album));
      player.play(playerSong);
    };
    return (isCurrentSong && playbackState.playing) ? (
      <IconButton aria-label='pause song' onClick={pause}>
        <PauseIcon />
      </IconButton>
    ) : (
      <IconButton aria-label='play song' onClick={play}>
        <PlayArrowIcon />
      </IconButton>
    );
  };

  const MoreCell = () => {
    const player = getPlayer();

    const [anchorEl, setAnchorEl] = useState(null);
    const [showInfo, setShowInfo] = useState(false);
    const router = useRouter();
    useEffect(() => {
      if (active !== undefined) {
        setShowInfo(active);
      }
    }, [active]);

    const openMenu = (e: React.MouseEvent<any>) => setAnchorEl(e.currentTarget);
    const closeMenu = () => setAnchorEl(null);

    const playNext = () => player.addSong(createSong(category, album, song), player.currentSong + 1);
    const addSong = () => player.addSong(createSong(category, album, song));

    const openInfo = () => {
      router.replace(router.pathname, `/albums/${category.link}/${album.link}?song=${song.link}`, {
        shallow: true
      });
      setShowInfo(true);
    };
    const closeInfo = () => {
      router.replace(router.pathname, `/albums/${category.link}/${album.link}`, {
        shallow: true
      });
      setShowInfo(false);
    };

    return (
      <>
        <IconButton
          aria-label='more song options'
          aria-controls='song-options-menu'
          aria-haspopup='true'
          onClick={openMenu}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id='song-options-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={closeMenu}
        >
          <MenuItem onClick={playNext}>Play next</MenuItem>
          <MenuItem onClick={addSong}>Add to playlist</MenuItem>
          {!hideInfo && (
            <MenuItem onClick={openInfo}>Song Info</MenuItem>
          )}
        </Menu>
        <SongInfo open={showInfo} category={category} album={album} song={song} handleClose={closeInfo} />
      </>
    );
  };

  return (
    <TableRow>
      <TableCell>
        <PlaybackCell />
      </TableCell>  
      <TableCell>
        <Typography variant='h6'>{playIndex}.</Typography>
      </TableCell>
      <TableCell>
        <Typography variant='h5'>{song.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{song.artist}</Typography>
      </TableCell>
      <TableCell>
        <Typography className={classes.dateCell}>{song.date}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{formatTime(song.duration)}</Typography>
      </TableCell>
      <TableCell>
        <MoreCell />
      </TableCell>
      <Hidden xsDown>
        <TableCell>
          <Tooltip title='Download Song'>
            <IconButton
              aria-label='download song'
              component='a'
              href={song.music}
              download={song.fileName}
            >
              <SaveAltIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </Hidden>
    </TableRow>
  );
}
