import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/styles';
import showdown from 'showdown';

import {getPlayer} from '../../audioPlayer';


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

export const SongInfo = ({open, album, song, handleClose}) => {
  const classes = useStyles();

  const play = () => getPlayer().play(album, song);

  return (
    <Drawer anchor='right' open={open} onClose={handleClose}>
      <div className={classes.details}>
        <Typography variant='h4' align='center'>{song.name}</Typography>
        <Typography variant='h5' align='center' gutterBottom>
          {album.name} - {song.artist}
        </Typography>

        <CardActions>
          <Button
            color='primary'
            onClick={play}
          >
            Play
          </Button>
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
              href={song.external}
            >
              Link
            </Button>
          )}
          {song.sheetMusic && (
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
              {song.description.split('\n').map((paragraph, i) => (
                <Typography
                  key={i}
                  align='justify'
                  paragraph
                  dangerouslySetInnerHTML={{
                    __html: converter.makeHtml(paragraph)
                  }}
                />
              ))}
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
