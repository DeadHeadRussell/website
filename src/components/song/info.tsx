import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {FC} from 'react';
import showdown from 'showdown';

import {createPlaylistFromAlbum, createSong, getPlayer} from '../../audioPlayer';
import {Album, Category, Song} from '../../../data/types';
import {formatTime, usePlayback} from '../../utils';
import {Description} from '../description';
import {PlayButton} from '../playButton';


const converter = new showdown.Converter({
  simpleLineBreaks: true
});

const useStyles = makeStyles(theme => ({
  drawer: {
    height: 'calc(100% - 81px)'
  },

  details: {
    padding: theme.spacing(4),
    paddingBottom: 81,

    [theme.breakpoints.down('sm')]: {
      maxWidth: '65%',
      margin: '0 auto'
    },

    [theme.breakpoints.up('md')]: {
      minWidth: 400,
      maxWidth: 600,
    }
  },

  link: {
    color: '#00e',
    cursor: 'pointer',
    textDecoration: 'none'
  }
}));

export interface SongInfoProps {
  open: boolean;
  category: Category;
  album: Album;
  song: Song;
  handleClose: () => void;
}

export const SongInfo: FC<SongInfoProps> = ({open, category, album, song, handleClose}) => {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  const player = getPlayer();
  const playbackState = usePlayback(player, false);
  const playlist = createPlaylistFromAlbum(category, album);
  const playerSong = createSong(category, album, song);

  const play = (seconds: number) => {
    if (player.isPlaying(playerSong)) {
      player.seek(seconds);
    } else {
      player.setPlaylist(playlist);
      const removeListener = player.addListener(action => {
        if (action == player.actions.LOAD) {
          player.seek(seconds);
          removeListener();
        }
      });
      player.play(playerSong);
    }
  };

  const anchor = sm ? 'bottom' : 'right';

  return (
    <Drawer classes={{paper: classes.drawer}} anchor={anchor} open={open} onClose={handleClose}>
      <div className={classes.details}>
        <Typography variant='h4' align='center'>{song.name}</Typography>
        <Typography variant='h5' align='center'>{album.name} - {song.artist}</Typography>
        <Typography variant='h6' align='center'  gutterBottom>{song.date}</Typography>

        <CardActions>
          <PlayButton
            playlist={playlist}
            song={playerSong}
          />
          <Button
            color='primary'
            component='a'
            href={song.music}
            download={song.fileName}
          >
            Download
          </Button>
          {song.external && (
            <Button
              color='primary'
              component='a'
              target='_blank'
              href={song.external}
            >
              Link
              &nbsp;
              <OpenInNewIcon fontSize='small' />
            </Button>
          )}
          {(song.sheetMusic && song.sheetMusicLink) && (
            <Button
              color='primary'
              component='a'
              href={song.sheetMusicLink}
              target='blank'
            >
              Sheet Music
            </Button>
          )}
        </CardActions>

        <Grid container spacing={2} direction='column'>
          {song.description && (
            <Grid item>
              <Description description={song.description} onPlay={play} context={{category, album, song}} />
            </Grid>
          )}
          {song.sections.length > 0 && (
            <Grid item>
              <>
                <Typography variant='h5' align='center'>Sections</Typography>
                <List>
                  {song.sections.map((section, i) => {
                    const nextSection = (i + 1) < song.sections.length
                      ? song.sections[i + 1]
                      : null;

                    const timeDisplay = nextSection
                      ? formatTime(section.startTime) + ' - ' + formatTime(nextSection.startTime)
                      : formatTime(section.startTime) + ' - ' + formatTime(song.duration);

                    return (
                      <div key={section.startTime}>
                        <a
                          className={classes.link}
                          onClick={() => play(section.startTime)}
                        >
                          {timeDisplay}
                        </a>
                        <span>: {section.title}</span>
                      </div>
                    );
                  })}
                </List>
              </>
            </Grid>
          )}
          {song.lyrics && (
            <Grid item>
              <>
                <Typography variant='h5' align='center'>Lyrics</Typography>
                <Typography
                  dangerouslySetInnerHTML={{
                    __html: converter.makeHtml(song.lyrics)
                  }}
                />
              </>
            </Grid>
          )}
          {song.credits && (
            <Grid item>
              <>
                <Typography variant='h5' align='center'>Credits</Typography>
                <List>
                  {song.credits.map(credit => (
                    <ListItem key={credit.who}>
                      <ListItemText primary={credit.who} secondary={credit.role} />
                    </ListItem>
                  ))}
                </List>
              </>
            </Grid>
          )}
        </Grid>
      </div>
    </Drawer>
  );
};
