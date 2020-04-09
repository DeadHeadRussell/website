import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/styles';

import {AlbumIcon} from '../album/icon';
import {AlbumLink} from '../album/link';


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
      maxWidth: 'calc(100vw - 410px)'
    }
  },

  songNameTooltip: {
    fontSize: theme.typography.pxToRem(theme.typography.fontSize)
  }
}));

export const AudioPlayerSongDisplay = ({song}) => {
  const classes = useStyles();

  return (
    <AlbumLink album={song.album} song={song}>
      <ButtonBase className={classes.songButton}>
        <Tooltip
          classes={{tooltip: classes.songNameTooltip}}
          arrow
          title={song.name + ' - ' + song.album.name + ' - ' + song.artist}
        >
          <Grid container spacing={2} wrap='nowrap'>
            <Grid item>
              <Hidden smDown>
                <AlbumIcon album={song.album} />
              </Hidden>
            </Grid>
            <Grid item>
              <Typography className={classes.songName}>{song.name}</Typography>
              <Hidden smDown>
                <Typography className={classes.songName}>{song.album.name} - {song.artist}</Typography>
              </Hidden>
            </Grid>
          </Grid>
        </Tooltip>
      </ButtonBase>
    </AlbumLink>
  );
};
