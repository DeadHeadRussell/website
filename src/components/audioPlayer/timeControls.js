import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {makeStyles, useTheme} from '@material-ui/styles';
import {useState} from 'react';

import {parseFormattedTime} from '../../utils';


const useStyles = makeStyles(theme => ({
  seekButton: {
    minWidth: 0,
    paddingLeft: 0,
    paddingRight: 0
  }
}));

export const AudioTimeControls = ({player, playbackState}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [seekInput, setSeekInput] = useState(null);
  const [inputError, setInputError] = useState(null);

  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  const openSeekDialog = () => {
    setDialogOpen(true);
    setSeekInput(playbackState.currentTimeFormatted);
  };

  const updateSeekInput = event => setSeekInput(event.target.value);

  const handleInputSeek = () => {
    const time = parseFormattedTime(seekInput);
    if (time >= 0) {
      player.seek(time);
      setDialogOpen(false);
      setSeekInput(null);
      setInputError(null);
    } else if (seekInput) {
      setInputError('Invalid time. Format is MM:SS.sss');
    } else {
      setDialogOpen(false);
    }
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
          <Dialog
            aria-labelledby='seek-dialog-title'
            open={dialogOpen}
            onClose={closeSeekDialog}
          >
            <DialogTitle id='seek-dialog-title'>Seek</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                label='Current Time'
                defaultValue={playbackState.currentTimeFormatted}
                value={seekInput}
                onChange={updateSeekInput}
                error={!!inputError}
                helperText={!!inputError ? inputError : 'Format is MM:SS.sss'}
              />
            </DialogContent>
            <DialogActions>
              <Button
                color='primary'
                onClick={handleInputSeek}
              >
                Seek
              </Button>
              <Button onClick={closeSeekDialog}>
                Close
              </Button>
            </DialogActions>
          </Dialog>
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
