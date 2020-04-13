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
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import React, {useEffect, useState, FC, ReactNode} from 'react';

import {Category} from '../data';
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
  
  title: {
    width: '100%',
    color: theme.palette.common.white,
    textShadow: '0px 0px 4px #333',
    marginLeft: 40 + theme.spacing(2)
  },

  header: {
    background: theme.palette.primary.main
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

  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3)
    }
  }
}));

export interface AppProps {
  categories: Category[];
  children: ReactNode;
}

import {usePlayback} from '../utils';
import {globalPlayer} from '../audioPlayer';
export const App: FC<AppProps> = ({categories, children}) => {
  const pbs = usePlayback(globalPlayer, true);

  const classes = useStyles();

  const [smallOpen, setSmallOpen] = useState(false);

  const handleDrawerToggle = () => setSmallOpen(!smallOpen);

  const drawerContent = (
    <div className={classes.drawerContent}>
      <Hidden smDown>
        <ListItem className={classes.header}>
          <Typography
            variant='h6'
            noWrap
          >
            <ListItemText
              primary='Andrew Russell'
              secondary='Musician'
              primaryTypographyProps={{
                className: classes.title
              }}
              secondaryTypographyProps={{
                className: classes.title
              }}
            />
          </Typography>
        </ListItem>
        <Divider />
      </Hidden>
      <List>
        <Link href='/'>
          <a className={classes.link}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar
                  src='/profile.jpg'
                  alt='Profile'
                />
              </ListItemAvatar>
              <ListItemText primary='Home' />
            </ListItem>
          </a>
        </Link>
      </List>
      <List>
        {categories.map(category => (
          <React.Fragment key={category.link}>
            <Divider />
            <CategoryLink category={category}>
              <ListItem button>
                <ListItemText primary={category.name} />
              </ListItem>
            </CategoryLink>
            {category.albums.map(album => (
              <AlbumLink key={album.link} album={album}>
                <ListItem button>
                  <ListItemAvatar>
                    <AlbumIcon album={album} />
                  </ListItemAvatar>
                  <ListItemText primary={album.name} />
                </ListItem>
              </AlbumLink>
            ))}
          </React.Fragment>
        ))}
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
            <Typography
              className={classes.title}
              color='inherit'
              variant='h6'
              noWrap
            >
              Andrew Russell - Musician
            </Typography>
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
        <div className={classes.toolbar} />
      </main>
      <AudioControls />
    </div>
  );
};