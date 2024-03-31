import Avatar from '@material-ui/core/Avatar';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import React from 'react';

import * as albums from './albums';
import {createCategory, createMenuCategory, createMenuLink, parseMultiLineString} from './dataHelpers';
import {Album, Category, ChartData, Conf, MenuData} from './types';

export const conf: Conf = {
  'band': {
    'name': 'Andrew Russell Band',
    'email': 'deadhead.russell@gmail.com',
    'description': 'Andrew Russell Band website',
    'about': parseMultiLineString(`
      Andrew Russell is a Canadian musician and composer from Victoria, BC that
      loves to tell stories through music. They focus on composing based on the
      needs of the story and draw from their background in styles such as jazz,
      romantic, jam bands, grunge and americana. They grew up playing the guitar
      and piano and their music tends to skew towards those instruments, however,
      they like to vary their arrangements to keep things fresh.
    `, true)
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
  studio: createCategory('studio', 'Studio Releases', '', albums.studio),
  projects: createCategory('projects', 'Projects', '', albums.projects),
  demos: createCategory('demos', 'Demos', '', albums.demos),
  old: createCategory('old', 'Old Works', '', albums.old)
};

categories.portfolio = createCategory('portfolio', 'Composition Portfolio', `
  I love using music to tell a story.  Usually the story comes first and genre, instruemntation and the music comes second, but there are a few standards I fall back on to help compose the best piece and not get caught up in the details.
  Also, music is entertainment.  I strive to write  music that is entertaining to all parties involved.  The musicians, the audience and the composers.
  Below is a collection of my best compositions.  Most of the records are demos so the quality of the performance does vary.
  <<break>>
  I am open to commissions so if you have a story or other media that you would like music to accompany, please reach out to the email address on the [[page:/about|About page]]! I am also happy to provide scores for any of my music upon request.
  And also, if you want to just chat about music, please reach out!
`, albums.portfolio(categories));

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
    createMenuCategory(categories.portfolio, false, ({...props}) => (
      <FeaturedPlayListIcon {...props} color='secondary' />
    )),
    createMenuCategory(categories.demos, false, LibraryMusicIcon),
    createMenuCategory(categories.old, false, LibraryMusicIcon)
  ],
  charts: false
};

export const charts: ChartData = {
  collections: [],
  songs: []
};

