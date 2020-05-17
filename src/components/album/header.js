import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/styles';

import {getPlayer} from '../../audioPlayer';
import {AlbumLink} from './link';


const useStyles = makeStyles(theme => ({
  album: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  },

  albumArt: {
    paddingTop: '100%'
  },

  albumText: {
    flexGrow: 1
  },

  content: {
    marginTop: theme.spacing(2)
  }
}));

export const AlbumHeader = ({album, link}) => {
  const classes = useStyles();

  const play = song => () => getPlayer().play(album, song);

  const Wrapper = link
    ? ({children}) => (
      <CardActionArea>
        <AlbumLink albumLink={album.link}>{children}</AlbumLink>
      </CardActionArea>
    )
    : ({children}) => children;

  return (
    <Card className={classes.album}>
      <Wrapper>
        <CardMedia title='Album Art' className={classes.albumArt} image={album.art} />
        <CardContent className={classes.albumText}>
          <Typography variant='h3' align='center'>
            {album.name}
          </Typography>
          <Typography variant='subtitle2' align='center'>
            {album.date}
          </Typography>
          <Typography className={classes.content} color='textSecondary'>{album.tagline}</Typography>
        </CardContent>
      </Wrapper>
      <CardActions>
        {((album.songs && album.songs.length > 0) || album.external) && (
          <div>
            <Grid container spacing={2} justify='center'>
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
      </CardActions>
    </Card>
  );
};

