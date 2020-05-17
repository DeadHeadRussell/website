import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/styles';

import {getPlayer} from '../../audioPlayer';


const useStyles = makeStyles(theme => ({
  album: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },

  albumArt: {
    height: 200
  },

  content: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  headline: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline'
  }
}));

export const HorizontalAlbumHeader = ({album, category}) => {
  const classes = useStyles();

  const play = song => () => getPlayer().play(album, song);

  return (
    <div className={classes.album}>
      <img className={classes.albumArt} src={album.art} alt='Album Art' />
      <div className={classes.content}>
        <div>
          <Typography variant='h3'>
            {album.name}
          </Typography>
          <div className={classes.headline}>
            <Typography variant='subtitle1'>
              {category.name} • {album.date}
            </Typography>
          </div>
          <Typography color='textSecondary'>{album.tagline}</Typography>
        </div>
        <div>
          {((album.songs && album.songs.length > 0) || album.external) && (
            <div>
              <Grid container spacing={2}>
                {album.songs && album.songs.length > 0 && (
                  <>
                    <Grid item>
                      <Button
                        color='primary'
                        size='small'
                        onClick={play(album.songs[0])}
                      >
                        Play
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        color='primary'
                        size='small'
                        component='a'
                        href={album.archive}
                        download={`${album.name}.zip`}
                      >
                        Download
                      </Button>
                    </Grid>
                  </>
                )}
                {album.external && (
                  <Grid item>
                    <Button
                      color='primary'
                      size='small'
                      component='a'
                      href={album.external}
                    >
                      Link
                    </Button>
                  </Grid>
                )}
              </Grid>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

