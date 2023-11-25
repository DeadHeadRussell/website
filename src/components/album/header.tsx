import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {FC, ReactNode} from 'react';

import {createPlaylistFromAlbum} from '../../audioPlayer';
import {Album, Category} from '../../../data/types';
import {formatTime, staticLink} from '../../utils';
import {PlayButton} from '../playButton';
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

export interface AlbumHeaderProps {
  album: Album;
  link?: boolean;
}

export const AlbumHeader: FC<AlbumHeaderProps> = ({album, link}) => {
  const classes = useStyles();

  const Wrapper: FC<{}> = link
    ? ({children}) => (
      <CardActionArea>
        <AlbumLink categoryLink={album.category.link} albumLink={album.link}>{children}</AlbumLink>
      </CardActionArea>
    )
    : ({children}) => <>{children}</>;

  return (
    <Card className={classes.album}>
      <Wrapper>
        <CardMedia title='Album Art' className={classes.albumArt} image={staticLink(album.art)} />
        <CardContent className={classes.albumText}>
          <Typography variant='h3' align='center'>
            {album.name}
          </Typography>
          <Typography variant='subtitle2' align='center'>
            {[album.date, formatTime(album.duration)].filter(v => !!v).join(' • ')}
          </Typography>
          <Typography className={classes.content} color='textSecondary'>{album.tagline}</Typography>
        </CardContent>
      </Wrapper>
      <CardActions>
        {((album.songs && album.songs.length > 0) || album.external) && (
          <div>
            <Grid container spacing={2} justifyContent='center'>
              {album.songs && album.songs.length > 0 && (
                <>
                  <Grid item>
                    <PlayButton playlist={createPlaylistFromAlbum(album.category, album)} size='small' />
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
                    target='_blank'
                    href={album.external}
                  >
                    Link
                    &nbsp;
                    <OpenInNewIcon fontSize='small' />
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

