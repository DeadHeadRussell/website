import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import {makeStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import {FC} from 'react';

import {AlbumIcon} from '../album/icon';
import {AlbumLink} from '../album/link';
import {AudioPlayerAlbum, AudioPlayerSong} from '../../audioPlayer';
import {staticLink} from '../../utils';


const useStyles = makeStyles(theme => ({
  songButton: {
    padding: `0 ${theme.spacing(2)}px`,
    borderRadius: theme.shape.borderRadius,
    textAlign: 'left'
  },
  

  songName: {
    maxWidth: 'calc(100vw - 730px)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    [theme.breakpoints.down('sm')]: {
      maxWidth: 'calc(100vw - 480px)'
    },

    [theme.breakpoints.down('xs')]: {
      maxWidth: 'calc(100vw - 320px)'
    }
  },

  songNameTooltip: {
    fontSize: theme.typography.pxToRem(theme.typography.fontSize)
  }
}));

export interface AudioPlayerSongDisplayProps {
  song: AudioPlayerSong;
  alwaysShowArt?: boolean;
}

export const AudioPlayerSongDisplay: FC<AudioPlayerSongDisplayProps> = ({song, alwaysShowArt}) => {
  const classes = useStyles();

  return (
    <AlbumLink categoryLink={song.category.link} albumLink={song.album.link} songLink={song.link}>
      <ButtonBase className={classes.songButton}>
        <Tooltip
          classes={{tooltip: classes.songNameTooltip}}
          arrow
          title={song.name + ' - ' + song.album.name + ' - ' + song.artist}
        >
          <Grid container spacing={2} wrap='nowrap'>
            <Grid item>
              {alwaysShowArt ? (
                <AlbumIcon albumArt={staticLink(song.album.art)} />
              ) : (
                <Hidden smDown>
                  <AlbumIcon albumArt={staticLink(song.album.art)} />
                </Hidden>
              )}
            </Grid>
            <Grid item>
              <Typography className={classes.songName}>{song.name}</Typography>
              <Typography className={classes.songName} variant='body2'>{song.album.name} - {song.artist}</Typography>
            </Grid>
          </Grid>
        </Tooltip>
      </ButtonBase>
    </AlbumLink>
  );
};
