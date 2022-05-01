import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Slider from '@material-ui/core/Slider';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import {FC} from 'react';

import {AudioPlayer} from '../../audioPlayer';
import {PlaybackState} from '../../utils';


const useStyles = makeStyles(theme => ({
  slider: {
    [theme.breakpoints.up('md')]: {
      position: 'relative',
      top: 2
    }
  },
  volumeText: {
    width: 28
  }
}));

export interface AudioVolumeControlsProps {
  player: AudioPlayer;
  playbackState: PlaybackState;
}

export const AudioVolumeControls: FC<AudioVolumeControlsProps> = ({player, playbackState}) => {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const iconSize = sm ? 'small' : 'medium';

  const decreaseVolume = () => player.setVolume(player.volume - 0.1);
  const increaseVolume = () => player.setVolume(player.volume + 0.1);

  return (
    <Grid container spacing={1} alignItems='center' wrap='nowrap'>
      <Grid item>
        <IconButton aria-label='decrease volume' onClick={decreaseVolume}>
          <VolumeDownIcon fontSize={iconSize} />
        </IconButton>
      </Grid>
      <Hidden xsDown>
        <Grid className={classes.slider} item xs>
          <Slider
            aria-label='volume slider'
            value={playbackState.volume}
            onChange={(_: any, newValue: number | number[]) => player.setVolume((newValue as number) / 100)}
          />
        </Grid>
      </Hidden>
      <Hidden smUp>
        <Grid item>
          <Typography className={classes.volumeText} align='center'>{playbackState.volume}</Typography>
        </Grid>
      </Hidden>
      <Grid item>
        <IconButton aria-label='increase volume' onClick={increaseVolume}>
          <VolumeUpIcon fontSize={iconSize} />
        </IconButton>
      </Grid>
    </Grid>
  );
};
