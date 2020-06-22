import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import {FC} from 'react';

import {createPlaylistFromFeed, getPlayer} from '../audioPlayer';
import {Feed as FeedType} from '../data';
import {HorizontalAlbumHeader} from './album/horizontalHeader';
import {Song} from './song';


const useStyles = makeStyles(theme => ({
  header: {
    marginBottom: theme.spacing(4)
  },

  paper: {
    marginBottom: theme.spacing(4),
    padding: theme.spacing(4)
  }
}));


export interface FeedProps {
  title: string;
  feed: FeedType;
}

export const Feed: FC<FeedProps> = ({title, feed}) => {
  const classes = useStyles();
  const player = getPlayer();
  const playlist = createPlaylistFromFeed(feed);

  const playAll = () => {
    player.setPlaylist(playlist);
    player.play();
  };

  return (
    <>
      <Container maxWidth='md' className={classes.header}>
        <Typography variant='h2'>{title}</Typography>
        <Button color='primary' onClick={playAll}>Play All</Button>
      </Container>
      <Container maxWidth='md'>
        {feed.map(item => (
          <Paper key={item.album.link} className={classes.paper}>
            <HorizontalAlbumHeader
              album={item.album}
              category={item.category}
              hidePlay={true}
              hideDownload={true}
            />
            <Table size='small'>
              <TableBody>
                {item.songs.map((song, index) => (
                  <Song
                    key={song.link}
                    playIndex={index + 1}
                    album={item.album}
                    song={song}
                    playlist={playlist}
                    hideInfo={true}
                  />
                ))}
              </TableBody>
            </Table>
          </Paper>
        ))}
      </Container>
    </>
  );
};

