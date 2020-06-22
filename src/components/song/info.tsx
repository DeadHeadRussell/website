import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {FC} from 'react';
import showdown from 'showdown';

import {createPlaylistFromAlbum, createSong} from '../../audioPlayer';
import {Album, Song} from '../../data';
import {Description} from '../description';
import {PlayButton} from '../playButton';


const converter = new showdown.Converter({
  simpleLineBreaks: true
});

const useStyles = makeStyles(theme => ({
  details: {
    minWidth: 400,
    maxWidth: 600,
    padding: theme.spacing(4)
  }
}));

export interface SongInfoProps {
  open: boolean;
  album: Album;
  song: Song;
  handleClose: () => void;
}

export const SongInfo: FC<SongInfoProps> = ({open, album, song, handleClose}) => {
  const classes = useStyles();

  return (
    <Drawer anchor='right' open={open} onClose={handleClose}>
      <div className={classes.details}>
        <Typography variant='h4' align='center'>{song.name}</Typography>
        <Typography variant='h5' align='center' gutterBottom>
          {album.name} - {song.artist}
        </Typography>

        <CardActions>
          <PlayButton
            playlist={createPlaylistFromAlbum(album)}
            song={createSong(album, song)}
          />
          <Button
            color='primary'
            component='a'
            href={song.music}
            download={`${song.name}.${song.extension}`}
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
              <Description description={song.description} />
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
