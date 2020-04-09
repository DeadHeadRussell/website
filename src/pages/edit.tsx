import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField, {TextFieldProps} from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {NextPage} from 'next';
import {useReducer, useState, FC, Reducer} from 'react';

import {Root} from '../components/root';
import {albums, Data, Album, Credit, Song, RawData} from '../data';


function dataReducer(state: Data, action: Action) {
  switch (action.type) {
    case 'addAlbum': {
      return {
        albums: [
          action.album,
          ...state.albums
        ]
      };
    }

    case 'updateAlbum': {
      const albums = [...state.albums];
      albums[action.index] = action.album;
      return {albums};
    }

    case 'addSong': {
      const albums = [...state.albums];
      albums[action.albumIndex].songs.push(action.song);
      return {albums};
    }

    case 'updateSong': {
      const albums = [...state.albums];
      const album = albums[action.albumIndex];
      album.songs[action.songIndex] = action.song;
      return {albums};
    }

    case 'addCredit': {
      const albums = [...state.albums];
      const album = albums[action.albumIndex];
      album.songs[action.songIndex].credits.push(action.credit);
      return {albums};
    }

    case 'updateCredit': {
      const albums = [...state.albums];
      const album = albums[action.albumIndex];
      const song = album.songs[action.songIndex];
      song.credits[action.creditIndex] = action.credit;
      return {albums};
    }
  }
}

export interface Action extends Record<string, any> {
  type: 'addAlbum' | 'updateAlbum' | 'addSong' | 'updateSong' | 'addCredit' | 'updateCredit';
}

const addAlbum: Action = {
  type: 'addAlbum',
  album: {songs: []}
};

const editAlbum = (album: Album, index: number): Action => ({
  type: 'updateAlbum',
  album, index
});

const addSong = (albumIndex: number): Action => ({
  type: 'addSong',
  song: {credits: []},
  albumIndex
});

const editSong = (song: Song, albumIndex: number, songIndex: number): Action => ({
  type: 'updateSong',
  song, albumIndex, songIndex
});

const addCredit = (albumIndex: number, songIndex: number): Action => ({
  type: 'addCredit',
  credit: {},
  albumIndex, songIndex
});

const editCredit = (credit: Credit, albumIndex: number, songIndex: number, creditIndex: number): Action => ({
  type: 'updateCredit',
  credit, albumIndex, songIndex, creditIndex
});

const useStyles = makeStyles(theme => ({
  card: {
    width: 800,
    margin: theme.spacing(2)
  },

  field: {
    width: '100%',
    marginTop: theme.spacing(1)
  },

  songs: {
    marginLeft: theme.spacing(4)
  },

  song: {
    marginTop: theme.spacing(2)
  },

  drawerPaper: {
    minWidth: 400,
    maxWidth: 600,
    padding: theme.spacing(4)
  }
}));

const FormField = ({data, name, onChange, ...props}) => {
  const classes = useStyles();

  return (
    <div>
      <TextField
        className={classes.field}
        label={name[0].toUpperCase() + name.slice(1)}
        defaultValue={data[name]}
        onBlur={e => onChange({...data, [name]: e.target.value})}
        {...props}
      />
    </div>
  );
};

const exportData = (stateData: Data): string => {
  const parsedData: RawData = {
    albums: stateData.albums.map(album => ({
      name: album.name,
      link: album.link,
      external: album.external,
      tagline: album.tagline,
      description: album.description,
      songs: album.songs.map(song => ({
        name: song.name,
        link: song.link,
        artist: song.artist,
        credits: song.credits,
        description: song.description,
        lyrics: song.lyrics
      }))
    }))
  };
  return JSON.stringify(parsedData, undefined, 2);
};

const EditPage: NextPage<{}> = () => {
  const [stateData, dispatch] = useReducer<Reducer<Data, Action>>(dataReducer, albums);
  const [showIndex, setShowIndex] = useState(null);
  const classes = useStyles();

  return (
    <Root albums={albums}>
      <Typography variant='h1' align='center'>Data Editor</Typography>
      <Button onClick={() => dispatch(addAlbum)}>
        Add Album
      </Button>
      <List>
        {stateData.albums.map((album, albumIndex) => (
          <ListItem key={albumIndex} button onClick={() => setShowIndex(albumIndex)}>
            <ListItemText>{album.name} ({album.link})</ListItemText>
            {showIndex == albumIndex && (
              <AlbumDrawer
                album={album}
                albumIndex={albumIndex}
                dispatch={dispatch}
                handleClose={() => setShowIndex(null)}
              />
            )}
          </ListItem>
        ))}
      </List>

      <Button onClick={() => navigator.clipboard.writeText(exportData(stateData))}>
        Copy to Clipboard
      </Button>
    </Root>
  );
};

const AlbumDrawer = ({album, albumIndex, dispatch, handleClose}) => {
  const [showIndex, setShowIndex] = useState(null);
  const classes = useStyles();

  return (
    <Drawer
      classes={{
        paper: classes.drawerPaper
      }}
      variant='temporary'
      anchor='right'
      open
      onClose={handleClose}
    >
      <div>
        <FormField
          data={album}
          name='name'
          onChange={album => dispatch(editAlbum(album, albumIndex))}
        />
        <FormField
          data={album}
          name='link'
          onChange={album => dispatch(editAlbum(album, albumIndex))}
        />
        <FormField
          data={album}
          name='external'
          onChange={album => dispatch(editAlbum(album, albumIndex))}
        />
        <FormField
          data={album}
          name='tagline'
          onChange={album => dispatch(editAlbum(album, albumIndex))}
          multiline
        />
        <FormField
          data={album}
          name='description'
          onChange={album => dispatch(editAlbum(album, albumIndex))}
          multiline
        />
      </div>
      <Button onClick={() => dispatch(addSong(albumIndex))}>
        Add Song
      </Button>
      <List>
        {album.songs.map((song, songIndex) => (
          <ListItem key={songIndex} button onClick={() => setShowIndex(songIndex)}>
            <ListItemText>{song.name} ({song.link})</ListItemText>
            {showIndex == songIndex && (
              <SongDrawer
                song={song}
                albumIndex={albumIndex}
                songIndex={songIndex}
                dispatch={dispatch}
                handleClose={() => setShowIndex(null)}
              />
            )}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

const SongDrawer = ({song, albumIndex, songIndex, dispatch, handleClose}) => {
  const classes = useStyles();

  return (
    <Drawer
      classes={{
        paper: classes.drawerPaper
      }}
      variant='temporary'
      anchor='right'
      open
      onClose={handleClose}
    >
      <FormField
        data={song}
        name='name'
        onChange={song => dispatch(editSong(song, albumIndex, songIndex))}
      />
      <FormField
        data={song}
        name='link'
        onChange={song => dispatch(editSong(song, albumIndex, songIndex))}
      />
      <FormField
        data={song}
        name='artist'
        onChange={song => dispatch(editSong(song, albumIndex, songIndex))}
      />
      <FormField
        data={song}
        name='description'
        onChange={song => dispatch(editSong(song, albumIndex, songIndex))}
        multiline
      />
      <FormField
        data={song}
        name='lyrics'
        onChange={song => dispatch(editSong(song, albumIndex, songIndex))}
        multiline
      />
      <Button onClick={() => dispatch(addCredit(albumIndex, songIndex))}>
        Add Credit
      </Button>
      <Table>
        <TableBody>
          {song.credits.map((credit, creditIndex) => (
            <TableRow>
              <TableCell>
                <FormField
                  data={credit}
                  name='who'
                  onChange={credit => dispatch(editCredit(credit, albumIndex, songIndex, creditIndex))}
                />
              </TableCell>
              <TableCell>
                <FormField
                  data={credit}
                  name='role'
                  onChange={credit => dispatch(editCredit(credit, albumIndex, songIndex, creditIndex))}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Drawer>
  );
};

export default EditPage;
