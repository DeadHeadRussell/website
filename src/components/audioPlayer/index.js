import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {makeStyles, useTheme} from '@material-ui/styles';
import {useContext} from 'react';

import {globalPlayer} from '../../audioPlayer';
import {usePlayback} from '../../utils';
import {AudioPlayerDownload} from './download';
import {AudioPlaybackControls} from './playbackControls';
import {AudioPlayerSongDisplay} from './songDisplay';
import {AudioTimeControls} from './timeControls';
import {AudioVolumeControls} from './volumeControls';


const useStyles = makeStyles(theme => ({
  drawer: {
    maxHeight: 90,
    padding: theme.spacing(2)
  }
}));

// TODO: Error if it cannot find the song.
export const AudioControls = () => {
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  const playbackState = usePlayback(globalPlayer, false);

  const spacing = xs ? 0 : 1;
  const justify = xs ? 'space-around' : 'center';

  return (
    <Drawer
      classes={{paper: classes.drawer}}
      anchor='bottom'
      variant='permanent'
      open
    >
      <Grid container spacing={spacing} justify={justify} alignItems='center' wrap='nowrap'>
        <Grid item>
          <AudioPlayerSongDisplay song={playbackState.song} />
        </Grid>
        <Grid item>
          <AudioPlayerDownload song={playbackState.song} />
        </Grid>
        <Grid item md={3} lg={4}>
          <AudioTimeControls player={globalPlayer} playbackState={playbackState} />
        </Grid>
        <Grid item>
          <AudioPlaybackControls player={globalPlayer} playbackState={playbackState} />
        </Grid>
        <Grid item sm={4} md={2} lg={2}>
          <AudioVolumeControls player={globalPlayer} playbackState={playbackState} />
        </Grid>
      </Grid>
    </Drawer>
  );
}

