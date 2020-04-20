import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import PauseIcon from '@material-ui/icons/Pause';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import {getPlayer} from '../../audioPlayer';
import {usePlayback} from '../../utils';
import {SongInfo} from './info';


export const Song = ({playIndex, album, song, active}) => {
  const [showInfo, setShowInfo] = useState(false);
  const router = useRouter();
  const player = getPlayer();
  const playbackState = usePlayback(player, false);

  useEffect(() => {
    setShowInfo(active);
  }, [active]);

  const isCurrentSong = playbackState.song === song;
  const pause = () => player.pause();
  const play = () => player.play(album, song);

  const openInfo = () => setShowInfo(true);
  const closeInfo = () => {
    router.replace(router.pathname, `/albums/${album.link}`);
    setShowInfo(false);
  };

  return (
    <TableRow>
      <TableCell>
        {(isCurrentSong && playbackState.playing) ? (
          <IconButton aria-label='pause song' onClick={pause}>
            <PauseIcon />
          </IconButton>
        ) : (
          <IconButton aria-label='play song' onClick={play}>
            <PlayArrowIcon />
          </IconButton>
        )}
      </TableCell>  
      <TableCell>
        <Typography variant='h6'>{playIndex}.</Typography>
      </TableCell>
      <TableCell>
        <Typography variant='h5'>
          {song.name}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography>
          {song.artist}
        </Typography>
      </TableCell>
      <TableCell>
        <Button variant='outlined' color='primary' onClick={openInfo}>
          Info
        </Button>
        <SongInfo open={showInfo} album={album} song={song} handleClose={closeInfo} />
      </TableCell>
      <Hidden xsDown>
        <TableCell>
          <Tooltip title='Download Song'>
            <IconButton
              aria-label='download song'
              component='a'
              href={song.music}
              download={`${song.name}.${song.extension}`}
            >
              <SaveAltIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </Hidden>
    </TableRow>
  );
}
