import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  header: {
    position: 'relative',
    width: '100%',
    height: '28vw',
    minHeight: 300,
    backgroundImage: 'url(/artist.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: 'center',
    backgroundPositionY: '58%',

    [theme.breakpoints.down('md')]: {
      height: '36vw',
      backgroundPositionY: '90%'
    },

    [theme.breakpoints.down('sm')]: {
      height: '38vw',
      backgroundPositionY: '66%'
    },

    [theme.breakpoints.down('xs')]: {
      height: 300,
      backgroundPositionX: 0,
      backgroundPositionY: '58%'
    },
  },

  overlay: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 180,
    width: '100%',
    background: 'linear-gradient(rgba(82, 37, 11, 0) 0%, rgba(82, 37, 11, 0.5) 30%, rgba(82, 37, 11, 0.8) 100%)'
  },

  text: {
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    color: '#e3deac',
    fontFamily: "'Oleo Script', arial, sans-serif",
    fontSize: '8em',
    lineHeight: '0.8',
    textStroke: '2px #52250b',

    [theme.breakpoints.down('sm')]: {
      paddingBottom: 0
    }
  },

  socialBar: {
    padding: theme.spacing(2) + 'px ' + theme.spacing(1) + 'px'
  },

  socialIcon: {
    width: 48,
    marginLeft: theme.spacing(1),
    verticalAlign: 'bottom',
    borderRadius: 15
  },

  socialLink: {
    width: '100%'
  }
}));

export const ArtistHeader = ({}) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.header}>
        <div className={classes.overlay}>
          <span className={classes.text}>Lavish Dude</span>
          <div className={classes.socialBar}>
            <a className={classes.socialLink} href='https://twitter.com/LavishDudeBand'>
              <img className={classes.socialIcon} src='/twitter.png' alt='Twitter' />
            </a>
            <a className={classes.socialLink} href='https://www.instagram.com/lavish.dude/'>
              <img className={classes.socialIcon} src='/instagram.png' alt='Instagram' />
            </a>
            <a className={classes.socialLink} href='https://fawm.org/@lavishdude'>
              <img className={classes.socialIcon} src='/fawm.jpg' alt='FAWM' />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

