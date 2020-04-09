import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  license: {
    width: 350,
    margin: 'auto',
    marginTop: theme.spacing(3),
    textAlign: 'center'
  }
}));

export const License = () => {
  const classes = useStyles();

  return (
    <section className={classes.license}>
      <a
        rel='license'
        href='http://creativecommons.org/licenses/by-nc/4.0/'
      >
        <img
          alt='Creative Commons License'
          src='https://i.creativecommons.org/l/by-nc/4.0/88x31.png'
        />
      </a>
      <p>
        This work is licensed under a&nbsp;
        <a rel='license' href='http://creativecommons.org/licenses/by-nc/4.0/'>
          Creative Commons Attribution-NonCommercial 4.0 International License
        </a>
        .
      </p>
    </section>
  );
};

