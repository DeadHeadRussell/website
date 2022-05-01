import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {green} from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import Alert from '@material-ui/lab/Alert';
import net from 'idelic-safety-net';
import {useEffect, useState, FC} from 'react';


const useStyles = makeStyles(theme => ({
  subscribe: {
    position: 'fixed',
    right: theme.spacing(2),
    bottom: theme.spacing(2) + 81,
    zIndex: 1
  },

  dialogContent: {
    paddingTop: 0,
    [theme.breakpoints.up('sm')]: {
      width: 400
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },

  field: {
    display: 'flex',
    width: '100%',
    marginBottom: theme.spacing(1)
  },

  feedInput: {
    color: theme.palette.common.black
  },

  subscribeLink: {
    paddingRight: theme.spacing(1)
  },

  loadProgress: {
    position: 'relative',
    left: 'calc(50% - 24px)',
    color: green[500]
  },

  success: {
    left: 'calc(50% - 24px)',
    background: green[500],
    color: theme.palette.common.white,

    '&:hover': {
      background: green[700]
    }
  }
}));

export const Subscribe: FC = () => {
  const [open, setOpen] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [typeInput, setTypeInput] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const classes = useStyles();

  const updateNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(event.currentTarget.value);
  };

  const updateEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(event.currentTarget.value);
  };

  const updateTypeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypeInput(event.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    const request = net.post('/api/subscriptions', {
      headers: {
        ['content-type']: 'application/json'
      },
      body: {
        name: nameInput,
        email: emailInput,
        type: typeInput
      }
    });

    try {
      await request.response;
      setLoading(false);
      setSuccess(true);
    } catch (e: any) {
      setLoading(false);
      setError('Subscription failed. Please try again or reach out to deadhead.russell@gmail.com');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSuccess(false);
    setError(null);
  };

  return (
    <>
      <Fab
        className={classes.subscribe}
        color='primary'
        variant='extended'
        onClick={() => setOpen(true)}
      >
        <AddIcon />
        Subscribe
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='subscribe-dialog-title'
      >
        <DialogTitle id='subscribe-dialog-title'>{success ? 'Subscribed' : 'Subscribe'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent className={classes.dialogContent}>
            <Grid container spacing={2} direction='column'>
              <Grid item>
                <Typography variant='h4'>RSS Feed</Typography>
                <Grid container direction='column'>
                  <Grid item>
                    <TextField
                      className={classes.field}
                      inputProps={{
                        className: classes.feedInput
                      }}
                      value='http://ajrussell.ca/feed.xml'
                      disabled
                    />
                  </Grid>
                  <Grid item>
                    <a
                      className={classes.subscribeLink}
                      href='https://feedly.com/i/subscription/feed%2Fhttp%3A%2F%2Fajrussell.ca%2Ffeed.xml'
                      target='blank'
                    >
                      <img
                        src='http://s3.feedly.com/img/follows/feedly-follow-rectangle-flat-small_2x.png'
                        alt='follow us in feedly'
                        width='66'
                        height='20'
                      />
                    </a>
                    <a
                      className={classes.subscribeLink}
                      href='http://ajrussell.ca/feed.xml'
                      target='blank'
                    >
                      <img
                        src='/rss.png'
                        alt='rss feed'
                        width='20'
                        height='20'
                      />
                    </a>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant='h4'>Mailing List</Typography>
                {loading ? (
                  <CircularProgress className={classes.loadProgress} size={48} />
                ) : success ? (
                  <Fab className={classes.success} onClick={handleClose}>
                    <CheckIcon />
                  </Fab>
                ) : (
                  <>
                    {error && (
                      <Alert className={classes.field} severity='error'>{error}</Alert>
                    )}
                    <TextField
                      className={classes.field}
                      autoFocus
                      label='Name'
                      value={nameInput}
                      onChange={updateNameInput}
                    />
                    <TextField
                      className={classes.field}
                      type='email'
                      required={true}
                      label='Email'
                      value={emailInput}
                      onChange={updateEmailInput}
                    />
                    <TextField
                      className={classes.field}
                      label='Type'
                      value={typeInput}
                      onChange={updateTypeInput}
                      placeholder='Eg, piano, rock, FAWM, all'
                    />
                  </>
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            {!success && !loading && (
              <Button
                color='primary'
                type='submit'
              >
                Subscribe
              </Button>
            )}
            <Button onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
