import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';

import {createAlbum, createCategory, createMenuCategory} from './dataHelpers.ts';

import * as _charts from './charts.ts';
import * as songs from './songs.ts';

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
          embedUrl: 'https://bandcamp.com/EmbeddedPlayer/album=3613951579/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/" seamless><a href="https://lavishdude.bandcamp.com/album/leading-off'
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
    })
  ]),
  demos: createCategory('demos', 'Demos', [
    createAlbum('fawm-2022', 'FAWM 2022', '2022-02', 'LAVISH DUDE', `
      [[category:demos|Lavish Dude]] is myself and Sean Brennan sometimes writing ok music. Songs are all demos written during FAWM.
    `, {
      songs: songs.fawm2022,
      external: 'https://fawm.org/fawmers/lavishdude'
    }),
    createAlbum('fawm-2021', 'FAWM 2021', '2021-02', 'LAVISH DUDE', `
      [[category:demos|Lavish Dude]] is myself and Sean Brennan kicking ass. Songs are all demos written during FAWM.
    `, {
      songs: songs.fawm2021,
      external: 'https://fawm.org/fawmers/lavishdude'
    }),
    createAlbum('fawm-2019', 'FAWM 2019', '2019-02-08 - 2019-02-10', 'LAVISH DUDE', `
      [[category:demos|Lavish Dude]] is myself and Sean Brennan kicking ass over a weekend during FAWM.  36 hours.  11 songs.  1hr of rocking out.
    `, {
      songs: songs.fawm2019,
      external: 'https://fawm.org/fawmers/lavishdude'
    })
  ])
};

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

