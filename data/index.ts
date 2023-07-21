import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';

import * as _charts from './charts';
import {createAlbum, createCategory, createMenuCategory} from './dataHelpers';
import * as songs from './songs';
import {Album, Category, ChartData, MenuData} from './types';

export const categories: Record<string, Category> = {
  studio: createCategory('studio', 'Studio Albums', [
    createAlbum('leading-off', 'Leading Off', '2022-09', 'Lavish Dude\'s Debut Album', `
      In July 2022, Lavish Dude recorded their debut album, Leading Off, during a one-week stay at a lakeside cabin in Lake, Michigan. It was released on September 14. Leading Off draws influences from a wide variety of genres and distills them down into an acoustic-alternative base, with shades of folk, grunge, and jam, and the occasional flourish from jazz, classical, and fusion.
    `, {
      duration: 69*60,
      links: {
        'youtube-music': {
          albumId: 'OLAK5uy_nOMrPa2GTOm8f3SFgAg4EbcDKfWCR9Eu0',
          musicUrl: 'https://music.youtube.com/playlist?list=OLAK5uy_nOMrPa2GTOm8f3SFgAg4EbcDKfWCR9Eu0&feature=share',
          embedUrl: 'https://www.youtube.com/embed/videoseries?list=OLAK5uy_nOMrPa2GTOm8f3SFgAg4EbcDKfWCR9Eu0'
        },
        youtube: {
          albumId: 'OLAK5uy_mlnlTzKVd4ft3y0POOOdyO8VVnhLFbOhI',
          musicUrl: 'https://www.youtube.com/watch?v=SUsaYuoVMzc&list=OLAK5uy_mlnlTzKVd4ft3y0POOOdyO8VVnhLFbOhI',
          embedUrl: 'https://www.youtube.com/embed/videoseries?list=OLAK5uy_mlnlTzKVd4ft3y0POOOdyO8VVnhLFbOhI'
        },
        spotify: {
          albumId: '0d6Z8IrToilY7XWRaqgOCZ',
          musicUrl: 'https://open.spotify.com/album/0d6Z8IrToilY7XWRaqgOCZ',
          embedUrl: 'https://open.spotify.com/embed/album/0d6Z8IrToilY7XWRaqgOCZ?utm_source=generator' 
        },
        apple: {
          albumId: '1645221927',
          musicUrl: 'https://music.apple.com/us/album/leading-off/1645221927?uo=4&app=music&at=1001lry3&ct=dashboard',
          embedUrl: 'https://embed.music.apple.com/us/album/leading-off/1645221927'
        },
        bandcamp: {
          albumId: 'leading-off',
          musicUrl: 'https://lavishdude.bandcamp.com/album/leading-off',
          embedUrl: 'https://bandcamp.com/EmbeddedPlayer/album=3613951579/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/'
        },
        amazon: {
          albumId: 'B0BFCSDY51',
          musicUrl: 'https://music.amazon.ca/albums/B0BFCSDY51',
          embedUrl: 'https://music.amazon.ca/embed/B0BFCSDY51/?id=IGXxoj1MaL&marketplaceId=ART4WZ8MWBX2Y&musicTerritory=CA',
        }
      },
      extras: {
        insert: {
          embedUrl: 'https://drive.google.com/file/d/1JK6zowGoYb1riFI5JmZWwKX1Fn6YvipV/preview',
          downloadUrl: ''
        },
        lyrics: {
          embedUrl: '',
          downloadUrl: ''
        }
      }
    }),
    createAlbum('wants-to-battle', 'Lavish Dude Wants To Battle', '2023-06', 'Dude Tunes go Chip Tunes!', `
      The perfect soundtrack for every ten-year-old leaving home to compete in unregulated animal fighting rings, Lavish Dude Wants to Battle is a complete re-imagining of 18 Lavish Dude songs. The signature acoustic Dude sound has been arranged in MIDI and run through an iconic video game synthesizer to produce an aesthetic that will be familiar to DudeHeads and master trainers alike. …We think we got through this without any trademark violations. Now hit Play and go run through some tall grass!
    `, {
      duration: 39*60 + 41,
      links: {
        'youtube-music': {
          albumId: 'OLAK5uy_kcSqu3CABtON3C9Hh4y1LPbRPm-kNiplk',
          musicUrl: 'https://music.youtube.com/playlist?list=OLAK5uy_kcSqu3CABtON3C9Hh4y1LPbRPm-kNiplk&feature=share',
          embedUrl: 'https://www.youtube.com/embed/videoseries?list=OLAK5uy_kcSqu3CABtON3C9Hh4y1LPbRPm-kNiplk'
        },
        youtube: {
          albumId: 'OLAK5uy_kcSqu3CABtON3C9Hh4y1LPbRPm-kNiplk',
          musicUrl: 'https://www.youtube.com/watch?v=Ta-5wOdn7AU&list=OLAK5uy_kcSqu3CABtON3C9Hh4y1LPbRPm-kNiplk',
          embedUrl: 'https://www.youtube.com/embed/videoseries?list=OLAK5uy_kcSqu3CABtON3C9Hh4y1LPbRPm-kNiplk'
        },
        spotify: {
          albumId: '67dUXwC2VjfJXKgRZG3fSl',
          musicUrl: 'https://open.spotify.com/album/67dUXwC2VjfJXKgRZG3fSl',
          embedUrl: 'https://open.spotify.com/embed/album/67dUXwC2VjfJXKgRZG3fSl?utm_source=generator' 
        },
        apple: {
          albumId: '1690946474',
          musicUrl: 'https://music.apple.com/us/album/lavish-dude-wants-to-battle/1690946474',
          embedUrl: 'https://embed.music.apple.com/us/album/lavish-dude-wants-to-battle/1690946474'
        },
        bandcamp: {
          albumId: 'lavish-dude-wants-to-battle',
          musicUrl: 'https://lavishdude.bandcamp.com/album/lavish-dude-wants-to-battle',
          embedUrl: 'https://bandcamp.com/EmbeddedPlayer/album=461450990/size=large/bgcol=52250b/linkcol=e3deac/artwork=small/transparent=true/'
        },
        amazon: {
          albumId: 'B0C71QV13B',
          musicUrl: 'https://music.amazon.ca/albums/B0C71QV13B',
          embedUrl: 'https://music.amazon.ca/embed/B0C71QV13B/?id=IGXxoj1MaL&marketplaceId=ART4WZ8MWBX2Y&musicTerritory=CA',
        }
      },
      extras: {}
    })
  ]),
  demos: createCategory('demos', 'Demos', [
    createAlbum('fawm-2023', 'FAWM 2023', '2023-02', 'LAVISH DUDE', `
      [[category:demos|Lavish Dude]] is just... why are you even here? Songs are all demos written during FAWM.
    `, {
      songs: songs.fawm2023,
      external: 'https://fawm.org/@lavishdude'
    }),
    createAlbum('fawm-2022', 'FAWM 2022', '2022-02', 'LAVISH DUDE', `
      [[category:demos|Lavish Dude]] is myself and Sean Brennan sometimes writing ok music. Songs are all demos written during FAWM.
    `, {
      songs: songs.fawm2022,
      external: 'https://fawm.org/@lavishdude'
    }),
    createAlbum('fawm-2021', 'FAWM 2021', '2021-02', 'LAVISH DUDE', `
      [[category:demos|Lavish Dude]] is myself and Sean Brennan kicking ass. Songs are all demos written during FAWM.
    `, {
      songs: songs.fawm2021,
      external: 'https://fawm.org/@lavishdude'
    }),
    createAlbum('fawm-2019', 'FAWM 2019', '2019-02-08 - 2019-02-10', 'LAVISH DUDE', `
      [[category:demos|Lavish Dude]] is myself and Sean Brennan kicking ass over a weekend during FAWM.  36 hours.  11 songs.  1hr of rocking out.
    `, {
      songs: songs.fawm2019,
      external: 'https://fawm.org/@lavishdude'
    })
  ])
};

export const feature: Album = categories.studio.album['leading-off'];

export const menu: MenuData = {
  categories: [
    createMenuCategory(categories.studio, true),
    createMenuCategory(categories.demos, false, LibraryMusicIcon)
  ]
};

export const charts: ChartData = {
  collections: _charts.collections,
  songs: _charts.songs
};

