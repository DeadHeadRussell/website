import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {useContext, FC} from 'react';

import {getPlayer} from '../../audioPlayer';
import {usePlayback} from '../../utils';
import {AudioPlayerDownload} from './download';
import {AudioPlaybackControls} from './playbackControls';
import {AudioPlayerPlaylist} from './playlist';
import {AudioPlayerSongDisplay} from './songDisplay';
import {AudioTimeControls} from './timeControls';
import {AudioVolumeControls} from './volumeControls';

import '../../mediaKeys';
import '../../notifications';


const useStyles = makeStyles(theme => ({
  test: {
    zIndex: 1301
  },

  drawer: {
    maxHeight: 90,
    padding: theme.spacing(2),
    overflow: 'visible'
  }
}));

export const AudioControls: FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  const player = getPlayer();
  const playbackState = usePlayback(player, false);

  const spacing = xs ? 0 : 1;
  const justify = xs ? 'space-around' : 'center';

  return (
    <Drawer
      className={classes.test}
      classes={{paper: classes.drawer}}
      anchor='bottom'
      variant='permanent'
      open
    >
      {playbackState.song ? (
        <Grid container spacing={spacing} justifyContent={justify} alignItems='center' wrap='nowrap'>
          <Grid item>
            <AudioPlayerSongDisplay song={playbackState.song} />
          </Grid>
          <Grid item>
            <Grid container spacing={0} wrap='nowrap'>
              <AudioPlayerPlaylist player={player} playbackState={playbackState} />
              <AudioPlayerDownload song={playbackState.song} />
            </Grid>
          </Grid>
          <Grid item md={3} lg={4}>
            <AudioTimeControls player={player} playbackState={playbackState} />
          </Grid>
          <Grid item>
            <AudioPlaybackControls player={player} playbackState={playbackState} />
          </Grid>
          <Grid item sm={4} md={2} lg={2}>
            <AudioVolumeControls player={player} playbackState={playbackState} />
          </Grid>
        </Grid>
      ) : (
        // TODO: Error if it cannot find the song.
        null
      )}
    </Drawer>
  );
}

