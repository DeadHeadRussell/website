const staticUrl = process.env.NEXT_PUBLIC_STATIC_URL;

export interface RawData {
  categories: RawCategory[];
}

export interface RawCategory {
  name: string;
  link: string;
  albums: RawAlbum[];
}

export interface RawAlbum {
  id: string;
  name: string;
  link: string;
  date: string;
  tagline: string;
  songs: RawSong[];
  description?: string;
  external?: string;
}

export interface RawSong {
  name: string;
  link: string;
  date: string;
  duration: number;
  artist?: string;
  credits: RawCredit[];
  video: boolean;
  sheetMusic: boolean;
  sections: RawSection[];
  description?: string;
  lyrics?: string;
  external?: string;
}

export interface RawCredit {
  who: string;
  role: string;
}

export interface RawSection {
  startTime: number;
  title: string;
}

export interface Category extends RawCategory {
  albums: Album[];
}

export interface Album extends RawAlbum {
  art: string;
  archive: string;
  duration: number;
  songs: Song[];
}

export interface Song extends RawSong {
  music: string;
  artist: string;
  fileName: string;
  sheetMusicLink: string | null;
  credits: Credit[];
  sections: Section[];
}

export interface Credit extends RawCredit {}

export interface Section extends RawSection {}

export interface MenuAlbum {
  link: string;
  name: string;
  art: string;
}

export interface MenuCategory {
  link: string;
  name: string;
  albums: MenuAlbum[];
}

export interface MenuData {
  categories: MenuCategory[];
}

export interface FeedItem {
  category: Category;
  album: Album;
  songs: Song[];
}

export type Feed = FeedItem[];

export interface ProcessedData {
  categories: Category[];
  albums: Album[];
  songs: Song[];
  highlightedCategory?: Category;
  highlightedAlbum?: Album;
  menu: MenuData;
}

export const processMenuData = (categories: Category[]): MenuData => ({
  categories: categories.map(category => ({
    link: category.link,
    name: category.name,
    albums: category.albums.map(album => ({
      link: album.link,
      name: album.name,
      art: album.art
    }))
  }))
});

export function createCategoryLink(category: RawCategory, file: string) {
  return `${staticUrl}/music/${category.link}/${file}`;
}

export function createAlbumLink(category: RawCategory, album: RawAlbum, file: string) {
  return createCategoryLink(category, `${album.link}/${file}`);
}

export function createSongLink(category: RawCategory, album: RawAlbum, song: RawSong, ext: string) {
  return createAlbumLink(category, album, `songs/${song.link}.${ext}`);
}

export const processAlbum = (rawCategory: RawCategory, rawAlbum: RawAlbum): Album => ({
  ...rawAlbum,
  art: createAlbumLink(rawCategory, rawAlbum, 'art.jpg'),
  archive: createAlbumLink(rawCategory, rawAlbum, 'archive.zip'),
  duration: (rawAlbum.songs || [])
    .map(song => song.duration)
    .reduce((total, duration) => total + duration, 0),
  songs: (rawAlbum.songs || []).map(rawSong => {
    const extension = rawSong.video ? 'mp4' : 'mp3';
    return {
      ...rawSong,
      music: createSongLink(rawCategory, rawAlbum, rawSong, extension),
      sheetMusicLink: rawSong.sheetMusic
        ? createSongLink(rawCategory, rawAlbum, rawSong, 'pdf')
        : null,
      artist: rawSong.artist || 'Lavish Dude',
      fileName: `${rawSong.name}.${extension}`,
      credits: rawSong.credits.length > 0
        ? (rawSong.credits || [])
        : [{'who': 'Lavish Dude', 'role': 'Everything'}],
      sections: rawSong.sections
    };
  })
});

export const processAlbums = (rawCategory: RawCategory): Album[] => rawCategory.albums
  .map(album => processAlbum(rawCategory, album));

export const processCategory = (rawCategory: RawCategory): Category => ({
  ...rawCategory,
  albums: processAlbums(rawCategory)
});

export const processCategories = (rawCategories: RawCategory[]): Category[] => rawCategories.map(processCategory);

export const processData = (rawData: RawData): ProcessedData => {
  const categories = processCategories(rawData.categories);
  const albums = categories.flatMap(category => category.albums);
  const songs = categories.flatMap(category => category.albums.flatMap(album => album.songs));
  return {
    categories,
    albums,
    songs,
    highlightedCategory: categories.find(category => category.link === 'solo_projects'),
    highlightedAlbum: albums.find(album => album.link === 'chosen'),
    menu: processMenuData(categories)
  };
}

