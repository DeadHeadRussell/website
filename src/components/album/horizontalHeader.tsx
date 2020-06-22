import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {FC} from 'react';

import {createPlaylistFromAlbum, Playlist} from '../../audioPlayer';
import {Album, Category} from '../../data';
import {PlayButton} from '../playButton';


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

export interface HorizontalAlbumHeaderProps {
  album: Album;
  category: Category;
  playlist?: Playlist;
  hidePlay?: boolean;
  hideDownload?: boolean;
}

export const HorizontalAlbumHeader: FC<HorizontalAlbumHeaderProps> = ({album, category, playlist, hidePlay, hideDownload}) => {
  const classes = useStyles();

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
                    {!hidePlay && (
                      <Grid item>
                        <PlayButton playlist={playlist || createPlaylistFromAlbum(album)} size='small' />
                      </Grid>
                    )}
                    {!hideDownload && (
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
                    )}
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
        </div>
      </div>
    </div>
  );
};

