export interface Category {
  name: string;
  link: string;
  albums: Album[];
  album: Record<string, Album>;
}

export interface Album {
  id: string;
  name: string;
  link: string;
  date: string;
  tagline: string;
  art: string;
  archive: string;
  duration: number;
  songs: Song[];
  song: Record<string, Song>;
  description?: string;
  external?: string;
  category: Category;
  embed: string;
  links: Record<string, {
    embedUrl: string;
    musicUrl: string;
    albumId: string;
  }>;
  extras: Record<string, {
    embedUrl: string;
    downloadUrl: string;
  }>;
}

export interface Song {
  name: string;
  link_: string;
  date: string;
  duration: number;
  credits: Credit[];
  video: boolean;
  sheetMusic: boolean;
  description?: string;
  lyrics?: string;
  external?: string;
  music: string;
  artist: string;
  fileName: string;
  sheetMusicLink: string | null;
  sections: Section[];
}

export interface Credit {
  who: string;
  role: string;
}

export interface Section {
  title: string;
  startTime: number;
}

export interface MenuAlbum {
  link: string;
  name: string;
  art: string;
}

export interface MenuCategory {
  link: string;
  name: string;
  albums: MenuAlbum[];
  Icon?: any;
}

export interface MenuLink {
  url: string;
  text: string;
  Icon?: any;
}

export interface MenuData {
  categories: MenuCategory[];
  charts: boolean;
}

export interface Chart {
  link: string;
  name: string;
  embedUrl: string;
  columns: string[];
};

export interface ChartData {
  collections: Chart[],
  songs: Chart[]
};
