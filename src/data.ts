export interface RawData {
  categories: RawCategory[];
}

export interface RawCategory {
  name: string;
  link: string;
  albums: RawAlbum[];
}

export interface RawAlbum {
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
  artist?: string;
  video: boolean;
  sheetMusic: boolean;
  description?: string;
  lyrics?: string;
  credits?: RawCredit[];
}

export interface RawCredit {
  who: string;
  role: string;
}

export interface Data extends RawData {
  categories: Category[];
}

export interface Category extends RawCategory {
  albums: Album[];
}

export interface Album extends RawAlbum {
  art: string;
  archive: string;
  songs: Song[];
}

export interface Song extends RawSong {
  music: string;
  artist: string;
  extension: string;
  sheetMusic?: string;
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

export interface AudioPlayerAlbum {
  link: string;
  name: string;
  art: string;
}

export interface AudioPlayerSong {
  link: string;
  name: string;
  artist: string;
  music: string;
  extension: string;
  album: AudioPlayerAlbum;
}

export interface AudioPlayerData {
  songs: AudioPlayerSong[];
  initialSong: number;
}

export interface ProcessedData {
  data: Data;
  categories: Category[];
  albums: Album[];
  menuData: MenuData;
  audioPlayerData: AudioPlayerData;
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

export const processAudioPlayerData = (albums: Album[]): AudioPlayerData => {
  const songs = albums.flatMap(album => album.songs.map(song => ({
    link: song.link,
    name: song.name,
    artist: song.artist,
    music: song.music,
    extension: song.extension,
    album: {
      link: album.link,
      name: album.name,
      art: album.art
    }
  })));
  return {
    songs,
    initialSong: songs.findIndex(song => song.link === 'no_light')
  };
};

export const processAlbum = (rawAlbum: RawAlbum): Album => ({
  ...rawAlbum,
  art: `/albums/${rawAlbum.link}/art.jpg`,
  archive: `/albums/${rawAlbum.link}/archive.zip`,
  songs: (rawAlbum.songs || []).map(rawSong => {
    const extension = rawSong.video ? 'mp4' : 'mp3';
    return {
      ...rawSong,
      music: `/albums/${rawAlbum.link}/songs/${rawSong.link}.${extension}`,
      artist: rawSong.artist || 'Andrew Russell',
      extension,
      credits: (rawSong.credits || []).length > 0
        ? (rawSong.credits || [])
        : [{"who": "Andrew Russell", "role": "Everything"}],
      ...(rawSong.sheetMusic
        ? {sheetMusic: `/albums/${rawAlbum.link}/songs/${rawSong.link}.pdf`}
        : {}
      )
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
  const data: Data = {
    categories: processCategories(rawData.categories)
  };

  const categories = data.categories;
  const albums = data.categories.flatMap(category => category.albums);
  const songs = data.categories.flatMap(category => category.albums.flatMap(album => album.songs));
  return {
    data,
    categories,
    albums,
    menuData: processMenuData(categories),
    audioPlayerData: processAudioPlayerData(albums)
  };
}
