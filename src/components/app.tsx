import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import MenuIcon from '@material-ui/icons/Menu';
import UpdateIcon from '@material-ui/icons/Update';
import Link from 'next/link';
import React, {useEffect, useState, FC, ReactNode} from 'react';

import {getPlayer, Playlist} from '../audioPlayer';
import {usePlayback} from '../utils';
import {MenuData} from '../data';
import {AlbumIcon} from './album/icon';
import {AlbumLink} from './album/link';
import {AudioControls} from './audioPlayer';
import {CategoryLink} from './category/link';
import {License} from './license';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },

  menuButton: {
    marginRight: theme.spacing(2)
  },

  header: {
    background: theme.palette.primary.main
  },

  logo: {
    height: '5em'
  },

  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },

  drawerPaper: {
    width: drawerWidth
  },

  drawerContent: {
    [theme.breakpoints.up('md')]: {
      paddingBottom: 81
    }
  },

  link: {
    width: '100%',
    color: 'inherit',
    textDecoration: 'none'
  },

  menuIcon: {
    marginLeft: 1,
    fontSize: 38
  },

  toolbar: {
    ...theme.mixins.toolbar,
    height: 77
  },

  toolbarBottom: {
    ...theme.mixins.toolbar,
    height: 77
  },

  content: {
    position: 'relative',
    flexGrow: 1
  }
}));

export interface AppProps {
  initialPlaylist?: Playlist;
  menu: MenuData;
  children: ReactNode;
}

export const App: FC<AppProps> = ({initialPlaylist, menu, children}) => {
  const classes = useStyles();

  const [smallOpen, setSmallOpen] = useState(false);

  const handleDrawerToggle = () => setSmallOpen(!smallOpen);

  const player = getPlayer();

  const playbackState = usePlayback(player, false);

  useEffect(() => {
    if (initialPlaylist && !player.touched) {
      player.setPlaylist(initialPlaylist);
    }
  }, [initialPlaylist]);

  const drawerContent = (
    <div className={classes.drawerContent}>
      <Hidden smDown>
        <Link href='/'>
          <a className={classes.link}>
            <ListItem className={classes.header}>
              <img className={classes.logo} src='/logo.png' alt='Logo' />
            </ListItem>
          </a>
        </Link>
      </Hidden>
      <List>
        {menu.categories.map(category => (
          <React.Fragment key={category.link}>
            <CategoryLink categoryLink={category.link}>
              <ListItem button>
                {category.Icon ? (
                  <ListItemAvatar>
                    <category.Icon className={classes.menuIcon} fontSize='inherit' />
                  </ListItemAvatar>
                ) : null}
                <ListItemText primary={category.name} />
              </ListItem>
            </CategoryLink>
            {category.albums.map(album => (
              <React.Fragment key={category.link + '_' + album.link}>
                <AlbumLink categoryLink={category.link} albumLink={album.link}>
                  <ListItem button>
                    <ListItemAvatar>
                      <AlbumIcon albumArt={album.art} />
                    </ListItemAvatar>
                    <ListItemText primary={album.name} />
                  </ListItem>
                </AlbumLink>
                <Divider />
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
        <Link href='/about'>
          <a className={classes.link}>
            <ListItem button>
              <ListItemAvatar>
                <EmojiPeopleIcon className={classes.menuIcon} fontSize='inherit' />
              </ListItemAvatar>
              <ListItemText primary='About' />
            </ListItem>
          </a>
        </Link>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <Hidden mdUp>
        <AppBar position='fixed' color='primary'>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              aria-label='menu'
              color='inherit'
              edge='start'
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Link href='/'>
              <a className={classes.link}>
                <img className={classes.logo} src='/logo.png' alt='Logo' />
              </a>
            </Link>
          </Toolbar>
        </AppBar>
      </Hidden>
      <nav className={classes.drawer}>
        <Hidden mdUp>
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant='temporary'
            anchor='left'
            open={smallOpen}
            onClose={handleDrawerToggle}
          >
            {drawerContent}
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant='permanent'
            open
          >
            {drawerContent}
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        <Hidden mdUp>
          <div className={classes.toolbar} />
        </Hidden>
        {children}
        <License />
        {playbackState.song ? (
          <div className={classes.toolbarBottom} />
        ) : null}
      </main>
      <AudioControls />
    </div>
  );
};
