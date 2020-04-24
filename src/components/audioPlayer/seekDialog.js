import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {useEffect, useState} from 'react';

import {parseFormattedTime} from '../../utils';


export const SeekDialog = ({open, defaultValue, onSeek, onCancel}) => {
  const [seekInput, setSeekInput] = useState(null);
  const [seekError, setSeekError] = useState(null);

  useEffect(() => {
    if (open) {
      setSeekInput(defaultValue);
    }
  }, [open]);

  const updateSeekInput = event => setSeekInput(event.target.value);

  const handleSeek = () => {
    const time = parseFormattedTime(seekInput);
    if (time >= 0) {
      setSeekInput(null);
      setSeekError(null);
      onSeek(time);
    } else if (seekInput) {
      setSeekError('Invalid time. Format is MM:SS.sss');
    } else {
      onCancel();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby='seek-dialog-title'
    >
      <DialogTitle id='seek-dialog-title'>Seek</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label='Current Time'
          value={seekInput}
          onChange={updateSeekInput}
          error={!!seekError}
          helperText={!!seekError ? seekError : 'Format is MM:SS.sss'}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color='primary'
          onClick={handleSeek}
        >
          Seek
        </Button>
        <Button onClick={onCancel}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
