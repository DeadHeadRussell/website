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
  video: boolean;
  sheetMusic: boolean;
  description?: string;
  lyrics?: string;
  credits?: RawCredit[];
  external?: string;
}

export interface RawCredit {
  who: string;
  role: string;
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
  extension: string;
  sheetMusicLink: string | null;
  credits: Credit[];
}

export interface Credit extends RawCredit {}

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

export const processAlbum = (rawAlbum: RawAlbum): Album => ({
  ...rawAlbum,
  art: `/albums/${rawAlbum.link}/art.jpg`,
  archive: `/albums/${rawAlbum.link}/archive.zip`,
  duration: (rawAlbum.songs || [])
  .map(song => song.duration)
  .reduce((total, duration) => total + duration, 0),
  songs: (rawAlbum.songs || []).map(rawSong => {
    const extension = rawSong.video ? 'mp4' : 'mp3';
    return {
      ...rawSong,
      music: `/albums/${rawAlbum.link}/songs/${rawSong.link}.${extension}`,
      sheetMusicLink: rawSong.sheetMusic
        ? `/albums/${rawAlbum.link}/songs/${rawSong.link}.pdf`
        : null,
      artist: rawSong.artist || 'Andrew Russell',
      extension,
      credits: (rawSong.credits || []).length > 0
        ? (rawSong.credits || [])
        : [{"who": "Andrew Russell", "role": "Everything"}],
    };
  })
});

export const processAlbums = (rawAlbums: RawAlbum[]): Album[] => rawAlbums.map(processAlbum);

export const processCategory = (rawCategory: RawCategory): Category => ({
  ...rawCategory,
  albums: processAlbums(rawCategory.albums)
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
    menu: processMenuData(categories)
  };
}

