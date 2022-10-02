import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {FC} from 'react';


const useStyles = makeStyles(theme => ({
  paper: {
    width: 550,
    margin: 'auto',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(4)
  },

  bandPhoto: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: 12
  }
}));


export const About: FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth='sm'>
      <Paper className={classes.paper}>
        <Typography variant='h3' align='center' gutterBottom>About</Typography>
        <Typography variant='body1'>
          Hailing from Kalamazoo, Michigan... no, wait, Victoria, British Columbia... Let's meet in the middle. Hailing from Glendive, Montana, Lavish Dude is an acoustic-alternative duo making a name for themselves with musical eclecticism, emotional sincerity, and conflicted fashion sensibilities. Guitarist Andrew Russell and violist Sean Brennan share vocals and take on multi-instrumental duties for songs that aim for big variety from a small toolbox. Andrew is also an accomplished pianist both in classical and jazz idioms, and Sean frequently plays with regional symphony orchestras. Lavish Dude draws from all these backgrounds to produce an alternative sound, supported by folk, jam, and grunge, with occasional seasonings from the great musical beyond. 
        </Typography>
        <img className={classes.bandPhoto} src='/profile.jpg' alt='Band photo' />
        <Typography variant='body1'>
          Email: <a href='mailto:lavishdude.band@gmail.com'>lavishdude.band@gmail.com</a>
        </Typography>
      </Paper>
    </Container>
  );
};

