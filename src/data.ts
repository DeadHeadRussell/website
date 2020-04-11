import {default as untypedRawData} from '../data.json';

const rawData: RawData = untypedRawData;

// TODO: Split out artists
// TODO: Add in all music and make this data great!!!

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
  category: Category;
  art: string;
  archive: string;
  songs: Song[];
}

export interface Song extends RawSong {
  album: Album;
  music: string;
  artist: string;
  credits: Credit[];
}

export interface Credit extends RawCredit {}

export const data: Data = {
  categories: rawData.categories.map(rawCategory => {
    const category = {
      ...rawCategory,
      albums: rawCategory.albums.map(rawAlbum => {
        const album = {
          ...rawAlbum,
          category: (null as unknown as Category), // we assign the category below.
          art: `/albums/${rawAlbum.link}/art.jpg`,
          archive: `/albums/${rawAlbum.link}/archive.zip`,
          songs: (rawAlbum.songs || []).map(rawSong => {
            return {
              ...rawSong,
              album: (null as unknown as Album), // we assign the album below.
              music: `/albums/${rawAlbum.link}/songs/${rawSong.link}.mp3`,
              artist: rawSong.artist || 'Andrew Russell',
              credits: (rawSong.credits || []).length > 0
                ? (rawSong.credits || [])
                : [{"who": "Andrew Russell", "role": "Everything"}]
            };
          })
        };

        album.songs.forEach(song => {
          song.album = album;
        });
        
        return album;
      })
    };

    category.albums.forEach(album => {
      album.category = category;
    });

    return category;
  })
};

export const categories = data.categories;

export const albums = data.categories.flatMap(category => category.albums);

export const highlightedAlbums = [
  data.categories[0].albums[0],
  data.categories[1].albums[0],
  data.categories[2].albums[0]
];

export const songs = data.categories.flatMap(category => category.albums.flatMap(album => album.songs));

const names = songs.map(song => song.name).sort();
console.log(names);

export default data;
