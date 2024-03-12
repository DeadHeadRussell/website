import {makeStyles} from '@material-ui/core/styles';

import conf from '../../../conf.json';

const useStyles = makeStyles(theme => ({
  header: {
    position: 'relative',
    width: '100%',
    height: '28vw',
    minHeight: 300,
    backgroundImage: `url(${conf.images.header})`,
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
    color: theme.palette.primary.contrastText,
    fontFamily: `${conf.theme.funFont}, arial, sans-serif`,
    fontSize: '8em',
    lineHeight: '0.8',
    textStroke: `2px ${theme.palette.primary.main}`,

    [theme.breakpoints.down('sm')]: {
      paddingBottom: 0
    }
  },

  socialBar: {
    padding: theme.spacing(2) + 'px ' + theme.spacing(1) + 'px'
  },

  socialIcon: {
    maxHeight: 48,
    width: 48,
    marginLeft: theme.spacing(1),
    verticalAlign: 'middle',
    borderRadius: 5
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
          <span className={classes.text}>{conf.band.name}</span>
          <div className={classes.socialBar}>
            {conf.links.youtube ? (
              <a className={classes.socialLink} href={`https://www.youtube.com/channel/${conf.links.youtube}`}>
                <img className={classes.socialIcon} src='/social/youtube.png' alt='YouTube' />
              </a>
            ) : null}
            {conf.links.twitch ? (
              <a className={classes.socialLink} href={`https://www.twitch.tv/${conf.links.twitch}`}>
                <img className={classes.socialIcon} src='/social/twitch.png' alt='Twitch' />
              </a>
            ) : null}
            {conf.links.twitter ? (
              <a className={classes.socialLink} href={`https://twitter.com/${conf.links.twitter}`}>
                <img className={classes.socialIcon} src='/social/twitter.png' alt='Twitter' />
              </a>
            ) : null}
            {conf.links.instagram ? (
              <a className={classes.socialLink} href={`https://www.instagram.com/${conf.links.instagram}`}>
                <img className={classes.socialIcon} src='/social/instagram.png' alt='Instagram' />
              </a>
            ) : null}
            {conf.links.fawm ? (
              <a className={classes.socialLink} href={`https://fawm.org/${conf.links.fawm}`}>
                <img className={classes.socialIcon} src='/social/fawm.jpg' alt='FAWM' />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
