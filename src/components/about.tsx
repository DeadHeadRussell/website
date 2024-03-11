import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {FC} from 'react';

import {staticLink} from '../utils';
import {conf} from '../../data';


const useStyles = makeStyles(theme => ({
  paper: {
    width: 550,
    margin: 'auto',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(4)
  },

  about: {
    fontSize: '1.1rem',
    lineHeight: 1.3
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
        <Typography className={classes.about} variant='body1'>{conf.band.about}</Typography>
        <img className={classes.bandPhoto} src={staticLink(conf.images.profile)} alt='Band photo' />
        <Typography variant='body1'>
          Email: <a href={`mailto:${conf.band.email}`}>{conf.band.email}</a>
        </Typography>
      </Paper>
    </Container>
  );
};

