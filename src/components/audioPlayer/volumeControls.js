import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {makeStyles, useTheme} from '@material-ui/styles';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';


const useStyles = makeStyles(theme => ({
  volumeText: {
    width: 28
  }
}));

export const AudioVolumeControls = ({player, playbackState}) => {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const iconSize = sm ? 'small' : 'default';

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
        <Grid item xs>
          <Slider
            aria-label='volume slider'
            value={playbackState.volume}
            onChange={(_, newValue) => player.setVolume(newValue / 100)}
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
