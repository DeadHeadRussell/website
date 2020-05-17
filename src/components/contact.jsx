import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
  paper: {
    marginBottom: theme.spacing(10),
    padding: theme.spacing(4)
  }
}));


export const Contact = () => {
  const classes = useStyles();

  return (
    <Container maxWidth='sm'>
      <Paper className={classes.paper}>
        <Typography variant='h3' align='center' gutterBottom>Contact</Typography>
        <Typography variant='body1'>
          Email: <a href='mailto:deadhead.russell@gmail.com'>deadhead.russell@gmail.com</a>
        </Typography>
      </Paper>
    </Container>
  );
};

