import Avatar from '@material-ui/core/Avatar';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import React from 'react';

import * as albums from './albums';
import {createCategory, createMenuCategory, createMenuLink} from './dataHelpers';
import {Album, Category, ChartData, MenuData} from './types';

export const conf = {
  'band': {
    'name': 'Andrew Russell Band',
    'email': 'deadhead.russell@gmail.com',
    'description': 'Andrew Russell Band website',
    'about': `
      Andrew Russell is a musician from Victoria, BC that loves to tell stories
      and express emotions through music. They focus on composing based on the
      need of the story and takes influence from styles such as jazz, romantic,
      jam bands and americana. They grew up playnig the guitar and piano and
      their music tends to skew towards, but they also like to vary their
      arrangements to keep things fresh.
    `
  },
  'theme': {
    'primary': '#021534',
    'secondary': '#3b8125',
    'contrast': '#e2dfb0',
    'grey': '#efefe2',
    'funColour': '#c2d9ff',
    'funFont': "'Harlow-Solid-Italic'",
    'funFontUrl': 'https://static.ajrussell.ca/fonts/harlow.css'
  },
  'links': {
    'fawm': '@deadhead',
    'youtube': 'UC90jLnzkadJUPYvwHVa6w8Q'
  },
  'images': {
    'favicon': '/img/favicon.png',
    'logo': '/img/logo.png',
    'header': '/img/artist.jpg',
    'profile': '/img/profile.jpg'
  }
};

export const categories: Record<string, Category> = {
  studio: createCategory('studio', 'Studio Releases', albums.studio),
  projects: createCategory('projects', 'Projects', albums.projects),
  demos: createCategory('demos', 'Demos', albums.demos),
  old: createCategory('old', 'Old Works', albums.old)
};

export const feature: Album = categories.studio.album['chosen'];

export const menu: MenuData = {
  categories: [
    createMenuCategory(categories.studio, true),
    createMenuLink('https://lavishdude.com', 'Lavish Dude', () => (
      <Avatar
        variant='square'
        src='https://lavishdude.com/favicon.png'
        alt='Lavish Dude'
        imgProps={{style: {objectFit: 'contain'}}}
      />
    )),
    createMenuCategory(categories.projects, true),
    createMenuCategory(categories.demos, false, LibraryMusicIcon),
    createMenuCategory(categories.old, false, LibraryMusicIcon)
  ],
  charts: false
};

export const charts: ChartData = {
  collections: [],
  songs: []
};

