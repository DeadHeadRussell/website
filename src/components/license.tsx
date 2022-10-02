import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {FC} from 'react';

const useStyles = makeStyles(theme => ({
  license: {
    width: 350,
    margin: 'auto',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    textAlign: 'center'
  }
}));

export const License: FC = () => {
  const classes = useStyles();

  return (
    <section className={classes.license}>
      <Typography variant='caption'>
        COPYRIGHT © 2022 ·  LAVISH DUDE  ·  ALL RIGHTS RESERVED
      </Typography>
    </section>
  );
};

