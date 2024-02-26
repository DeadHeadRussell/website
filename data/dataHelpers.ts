import {Album, Category, Chart, Credit, MenuAlbum, MenuCategory, MenuLink, Section, Song} from './types';

export function createCategoryLink(category: string, file: string) {
  return `/music/${category}/${file}`;
}

export function createAlbumLink(category: string, album: string, file: string) {
  return createCategoryLink(category, `${album}/${file}`);
}

export function createSongLink(category: string, album: string, song: string, ext: string) {
  return createAlbumLink(category, album, `songs/${song}.${ext}`);
}

export function parseLink(name: string): string {
  return name.toLowerCase().replace(/[!@#$%^&*()\_+=,.'"<>?\\]/g, '').replace(/( |-)+/g, '-');
}

export function parseMultiLineString(s: string, startChar?: string): string {
  return s.split('\n').map((line: string) => startChar
    ? line.slice(line.indexOf(startChar) + 1).trimEnd()
    : line.trim()
  ).join('\n');
}

export function createMenuAlbum(album: Album): MenuAlbum {
  return {
    link: album.link,
    name: album.name,
    art: album.art
  };
}

export function createMenuCategory(category: Category, includeAlbums: boolean, Icon: any = null): MenuCategory {
  return {
    link: category.link,
    name: category.name,
    Icon,
    albums: includeAlbums
      ? category.albums.map(createMenuAlbum)
      : []
  }
}

export function createMenuLink(url: string, text: string, Icon: any = null): MenuLink {
  return {url, text, Icon};
}

export function createCategory(link: string, name: string, albums: Album[]): Category {
  const category: any = {link, name};
  category.albums = albums
      .map(album => ({
        ...album,
        art: createAlbumLink(category.link, album.link, 'art.jpg'),
        archive: createAlbumLink(category.link, album.link, 'archive.zip'),
        category
      }));
 
  category.album = category.albums
      .reduce((albumObj: any, album: Album) => {
        albumObj[album.link] = album;
        return albumObj;
      }, {} as any);

  category.albums.forEach((album: Album) => {
    if (album.songs) {
      album.songs = album.songs.map((song: Song) => {
        const extension = song.video ? 'mp4' : 'mp3';
        return {
          ...song,
          album,
          music: createSongLink(album.category.link, album.link, song.link, extension),
          sheetMusicLink: song.sheetMusic
            ? createSongLink(album.category.link, album.link, song.link, 'pdf')
            : null,
          fileName: `${song.name}.${extension}`
        };
      });

      album.song = album.songs
        .reduce((songObj: any, song: Song) => {
          songObj[song.link] = song;
          return songObj
        }, {} as any);

      album.duration = album.songs
        .map((song: Song) => song.duration)
        .reduce((total: number, duration: number) => total + duration, 0);
    } else {
      album.songs = [];
      album.song = {};
    }
  });

  return category as Category;
}

export function createAlbum(link: string, name: string, date: string, tagline: string, description: string, other: any = {}): Album {
  return {
    link,
    name,
    date,
    tagline,
    description,
    embed: other.embed,
    links: other.links,
    extras: other.extras,
    external: other.external,
    songs: other.songs,
    duration: other.duration
  } as any as Album;
}

export function songConvertor(songData: any): Song {
  return createSong(
    songData['name'],
    songData['date'],
    songData['duration'],
    songData['credits'] || [],
    {
      link: songData['link'],
      artist: songData['artist'],
      video: songData['video'],
      sheetMusic: songData['sheetMusic'],
      description: songData['description'],
      lyrics: songData['lyrics'],
      external: songData['external'],
      sections: songData['sections']
    }
  );
}

export function createSong(name: string, date: string, duration: number, credits: Credit[], other: any = {}): Song {
  return {
    link: other.link || parseLink(name),
    name,
    date,
    duration,
    artist: other.artist || 'Andrew Russell Band',
    credits: (credits && credits.length > 0) ? credits : [createCredit('Andrew Russell', 'Everything')],
    video: other.video || false,
    sheetMusic: other.sheetMusic || false,
    description: parseMultiLineString(other.description || ''),
    lyrics: parseMultiLineString(other.lyrics || ''),
    external: other.external,
    sections: other.sections || []
  } as any as Song;
}

export function createCredit(who: string, role: string): Credit {
  return {who, role};
}

export function createSection(title: string, startTime: number): Section {
  return {title, startTime};
}

export function createChart(name: string, embedUrl: string, columns: string[]): Chart {
  return {
    link: parseLink(name),
    name,
    embedUrl,
    columns
  };
}

