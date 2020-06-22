import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {FC} from 'react';


const useStyles = makeStyles(theme => ({
  paper: {
    marginBottom: theme.spacing(10),
    padding: theme.spacing(4)
  }
}));


export const Contact: FC = () => {
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

