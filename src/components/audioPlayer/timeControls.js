import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {makeStyles, useTheme} from '@material-ui/styles';
import {useState} from 'react';

import {SeekDialog} from './seekDialog';


const useStyles = makeStyles(theme => ({
  seekButton: {
    minWidth: 0,
    paddingLeft: 0,
    paddingRight: 0
  }
}));

export const AudioTimeControls = ({player, playbackState}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  const openSeekDialog = () => setDialogOpen(true);

  const handleSeek = time => {
    player.seek(time);
    setDialogOpen(false);
  };

  const closeSeekDialog = () => setDialogOpen(false);

  const seek = (_, newTime) => player.seek(newTime);

  return (
    <Grid container spacing={sm ? 0 : 2} alignItems='center' wrap='nowrap'>
      <Hidden smDown>
        <Grid item>
          <Typography component='span'>{playbackState.currentTimeFormatted}</Typography>
        </Grid>
        <Grid item xs>
          <Slider
            aria-label='time seek slider'
            value={playbackState.currentTime}
            max={playbackState.duration}
            onChange={seek}
          />
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Grid item>
          <Button className={classes.seekButton} color='secondary' onClick={openSeekDialog}>
            <Typography component='span'>{playbackState.currentTimeFormatted}</Typography>
          </Button>
          <SeekDialog
            open={dialogOpen}
            defaultValue={playbackState.currentTimeFormatted}
            onSeek={handleSeek}
            onCancel={closeSeekDialog}
          />
        </Grid>
        <Grid item>
          <Typography>/</Typography>
        </Grid>
      </Hidden>
      <Grid item>
        <Typography>{playbackState.durationFormatted}</Typography>
      </Grid>
    </Grid>
  );
};
