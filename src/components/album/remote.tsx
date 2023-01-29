import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {FC, Fragment} from 'react';

import {Album as AlbumType} from '../../data';
import {Description} from '../description';


const useStyles = makeStyles(theme => ({
  album: {
    marginTop: theme.spacing(4),
    paddingBottom: theme.spacing(6)
  },

  albumWrapper: {
    [theme.breakpoints.down('md')]: {
      width: '80%',
      margin: 'auto',
      marginTop: theme.spacing(4),
      paddingBottom: theme.spacing(6)
    }
  },

  item: {
    margin: 'auto',
  },

  albumArt: {
    display: 'block',
    alignSelf: 'center',
    width: '100%',
    maxWidth: 700,
    margin: 'auto'
  },

  streamingBar: {
    display: 'flex',
    flexFlow: 'row nowrap',
    width: 'fit-content',
    margin: 'auto',
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    justifyContent: 'flex-start',
    alignItems: 'center',
    background: '#52250b',
    borderRadius: 6,

    [theme.breakpoints.down('xs')]: {
      flexFlow: 'row wrap',
      justifyContent: 'center',
      paddingTop: theme.spacing(0)
    }
  },

  streamingLink: {
    display: 'flex',
    alignItems: 'center',
    width: 48,
    height: 48,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),

    [theme.breakpoints.down('xs')]: {
      flex: '0 1 25%',
      marginTop: theme.spacing(1),
    }
  },

  streamingIcon: {
    width: 48,
    margin: 'auto'
  },

  description: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    paddingRight: theme.spacing(4)
  },

  spotify: {
    display: 'block',
    width: '100%',
    maxWidth: 800,
    minHeight: 380,
    borderRadius: 12
  },

  insert: {
    display: 'block',
    width: '100%',
    maxWidth: 800,
    margin: 'auto',
    marginTop: theme.spacing(8),

    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(2)
    }
  },

  insertEmbed: {
    width: '100%',
    height: 800,
    minHeight: 800,
    marginTop: theme.spacing(2)
  }
}));

export interface RemoteAlbumProps {
  album: AlbumType;
}

const Art: FC<RemoteAlbumProps> = ({album}) => {
  const classes = useStyles();
  return (
    <img className={classes.albumArt} src={album.art} alt='Album Art' />
  );
};

const StreamingBar: FC<RemoteAlbumProps> = ({album}) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Typography variant='h3' align='center'>{album.name}</Typography>
      <Typography variant='h4' align='center'>{album.tagline}</Typography>
      <div className={classes.streamingBar}>
        {['spotify', 'apple', 'youtube-music', 'youtube', 'bandcamp', 'amazon'].map(service => (
          <a key={service} className={classes.streamingLink} href={album.links[service].musicUrl}>
            <img className={classes.streamingIcon} src={'/' + service + '.png'} alt={service} />
          </a>
        ))}
      </div>
    </Fragment>
  );
};

const AlbumDescription: FC<RemoteAlbumProps> = ({album}) => {
  const classes = useStyles();
  return album.description ? (
    <div className={classes.description}>
      <Description description={album.description} context={{album}} />
    </div>
  ) : null;
};

const Player: FC<RemoteAlbumProps> = ({album}) => {
  const classes = useStyles();
  return (
    <iframe
      key='player-iframe'
      className={classes.spotify}
      src={album.links.spotify.embedUrl}
      frameBorder='0'
      allowFullScreen
      allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
      loading='lazy'
    />
  );
};

const Insert: FC<RemoteAlbumProps> = ({album}) => {
  const classes = useStyles();
  return (
    <div className={classes.insert}>
      <Typography variant='h3' align='center'>Album Insert</Typography>
      <iframe
        className={classes.insertEmbed}
        src={album.extras.insert.embedUrl}
        allow='autoplay'
        frameBorder='0'
        allowFullScreen
      />
    </div>
  );
};

export const RemoteAlbum: FC<RemoteAlbumProps> = ({album}) => {
  const classes = useStyles();

  return (
    <div className={classes.albumWrapper}>
      <Grid container className={classes.album} spacing={2}>
        <Hidden lgUp>
          <Grid item className={classes.item} xs={12}>
            <StreamingBar album={album} />
          </Grid>
        </Hidden>
        <Grid item className={classes.item} lg={6} xs={12}>
          <Art album={album} />
        </Grid>
        <Grid item className={classes.item} lg={6} xs={12}>
          <Hidden mdDown>
            <StreamingBar album={album} />
            <AlbumDescription album={album}/>
          </Hidden>
          <Player key='player' album={album} />
        </Grid>
        <Hidden lgUp>
          <Grid item className={classes.item} xs={12}>
            <AlbumDescription album={album}/>
          </Grid>
        </Hidden>
        <Grid item className={classes.item} xs={12}>
          <Insert album={album} />
        </Grid>
      </Grid>
    </div>
  );
};

/*
Apple Music
<iframe
  style={{width:'100%',maxWidth:660,overflow:'hidden',background:'transparent'}}
  allow='autoplay *; encrypted-media *; fullscreen *; clipboard-write'
  frameborder='0'
  height='450'
  sandbox='allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation'
  src={album.links.apple.embedUrl}
/>

YouTube
<iframe
  width='560'
  height='560'
  src={album.links.youtube.embedUrl}
  frameborder='0'
  allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
  allowFullScreen
/>

Amazon Music
<iframe
  id='AmazonMusicEmbedB0BFCSDY51'
  src={album.links.amazon.embedUrl}
  width='100%'
  height='550px'
  style={{border:'1px solid rgba(0, 0, 0, 0.12)'}}
/>
*/

