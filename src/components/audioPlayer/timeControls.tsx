import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Slider from '@material-ui/core/Slider';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {FC} from 'react';

import {AudioPlayer} from '../../audioPlayer';
import {PlaybackState} from '../../utils';


const useStyles = makeStyles(theme => ({
  slider: {
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      left: 0,
      top: -15,
      right: 0,
      zIndex: 1,
      height: 30,
      margin: 0,
      paddingLeft: '0 !important',
      paddingRight: '0 !important'
    }
  },

  smallText: {
    position: 'absolute',
    top: theme.spacing(0.5),
    right: theme.spacing(2)
  }
}));

export interface AudioTimeControlsProps {
  player: AudioPlayer;
  playbackState: PlaybackState;
}

export const AudioTimeControls: FC<AudioTimeControlsProps> = ({player, playbackState}) => {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  const seek = (_: any, newTime: number | number[]) => player.seek(newTime as number);

  return (
    <Grid container spacing={sm ? 0 : 2} alignItems='center' wrap='nowrap'>
      <Hidden smDown>
        <Grid item>
          <Typography component='span'>{playbackState.currentTimeFormatted}</Typography>
        </Grid>
      </Hidden>
      <Grid className={classes.slider} item xs>
        <Slider
          aria-label='time seek slider'
          value={playbackState.currentTime}
          max={playbackState.duration}
          onChange={seek}
        />
      </Grid>
      <Hidden smDown>
        <Grid item>
          <Typography>{playbackState.durationFormatted}</Typography>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Grid className={classes.smallText} item>
          <Typography variant='body2'>{playbackState.currentTimeFormatted}/{playbackState.durationFormatted}</Typography>
        </Grid>
      </Hidden>
    </Grid>
  );
};
