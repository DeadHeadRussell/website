import {Category, Album, Song} from './data/types';
import {setupListensCount} from './listensCount';
import {setupMediaKeys} from './mediaKeys';
import {createNotifications} from './notifications';

export type Action = 'PLAY' | 'PAUSE' | 'PREVIOUS' | 'NEXT' | 'SEEK' | 'LOAD';
export type Actions = {[Key in Action]: Key};

export interface AudioPlayerCategory {
  link: string;
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
  fileName: string;
  album: AudioPlayerAlbum;
  category: AudioPlayerCategory;
}

export type AudioPlayerListener = (action: Action) => void;

export interface AudioPlayerSongLink {
  link: string;
  album: {
    link: string;
  };
  category: {
    link: string;
  };
}

export type Playlist = AudioPlayerSong[];

export class AudioPlayer {
  actions: Actions = {
    PLAY: 'PLAY',
    PAUSE: 'PAUSE',
    PREVIOUS: 'PREVIOUS',
    NEXT: 'NEXT',
    SEEK: 'SEEK',
    LOAD: 'LOAD'
  };

  listeners: AudioPlayerListener[] = [];
  playlist: Playlist = [];
  currentSong: number = 0;
  repeat: string | null = null;

  _player: null | HTMLAudioElement = null;
  _touched: boolean = false;

  constructor(initialPlaylist: Playlist = []) {
    this.playlist = initialPlaylist;

    if (typeof window !== 'undefined') {
      this.player;
    }
  }

  addListener = (listener: AudioPlayerListener) => {
    const index = this.listeners.push(listener) - 1;
    return () => {
      this.listeners.splice(index, 1);
    };
  };

  handleUpdate = (action: Action): void => {
    this.listeners.forEach(listener => listener(action));
  };

  setPlaylist = (playlist: Playlist): void => {
    this.playlist = playlist;
    this.setSong(0);

    if (this.playlist.length === 0) {
      this._touched = false;
    }
  }

  addPlaylist = (playlist: Playlist, index?: number): void => {
    if (index !== undefined) {
      if (this.currentSong >= index) {
        this.currentSong += 1;
      }
      this.playlist.splice(index, 0, ...playlist);
    } else {
      this.playlist.splice(this.playlist.length, 0, ...playlist);
    }
  }

  addSong = (song: AudioPlayerSong, index?: number): void => {
    this.addPlaylist([song], index);
  }

  removeSong = (index: number): void => {
    if (index >= 0) {
      if (this.currentSong === index) {
        this.setSong(this.currentSong + 1);
      }
      if (this.currentSong > index) {
        this.currentSong -= 1;
      }
      this.playlist.splice(index, 1);
    }

    if (this.playlist.length === 0) {
      this._touched = false;
    }
  }

  setSong = (currentSong: number): void => {
    const previousSong = this.song;
    this.currentSong = currentSong;
    if (this.song) {
      this.player.src = this.song.music;
    } else {
      this.pause();
    }
  }

  isPlaying = (song: AudioPlayerSongLink): boolean => {
    return songMatcher(this.song)(song);
  }

  play = (song?: AudioPlayerSongLink): void => {
    if (song) {
      this.setSong(this.playlist.findIndex(songMatcher(song)));
    }

    this.player.play();
    this._touched = true;
    this.handleUpdate(this.actions.PLAY);
  }

  playIndex = (index: number): void => {
    this.setSong(index);
    this.player.play();
    this._touched = true;
    this.handleUpdate(this.actions.PLAY);
  }

  pause = (): void => {
    this.player.pause();
    this.handleUpdate(this.actions.PAUSE);
  }

  previous = (): void => {
    const isPlaying = this.playing;
    this.setSong(Math.max(this.currentSong - 1, 0));
    if (isPlaying) {
      this.player.play();
    }
    this.handleUpdate(this.actions.PREVIOUS);
  }

  next = (forcePlay?: boolean): void => {
    const isPlaying = this.playing;
    const nextSong = this.currentSong + 1;
    if (nextSong >= this.playlist.length) {
      this.player.pause();
      this.setSong(0);
    } else {
      this.setSong(nextSong);
      if (isPlaying || forcePlay) {
        this.player.play();
      }
    }
    this.handleUpdate(this.actions.NEXT);
  }

  seek = (newTime: number): void => {
    this.player.currentTime = newTime;
    this.handleUpdate(this.actions.SEEK);
  }

  seekOffset = (offset: number): void => {
    this.player.currentTime += offset;
    this.handleUpdate(this.actions.SEEK);
  }

  repeatOne = (): void => {
    this.repeat = 'one';
  }

  repeatAll = (): void => {
    this.repeat = 'all';
  }

  repeatOff = (): void => {
    this.repeat = null;
  }

  get song(): AudioPlayerSong | undefined {
    return this.playlist[this.currentSong];
  }

  get player(): HTMLAudioElement {
    if (!this._player) {
      this._player = window.document.createElement('audio');
      if (this.song) {
        this._player.src = this.song.music;
      }
      this._player.addEventListener('canplay', () => this.onLoaded());
      this._player.addEventListener('ended', () => this.onEnded());
      window.document.body.appendChild(this._player);
    }
    return this._player;
  }

  destroy(): void {
    this._player && this._player.remove();
    this._player = null;
  }

  onLoaded(): void {
    this.handleUpdate(this.actions.LOAD);
  }

  onEnded(): void {
    const isLastSong = this.currentSong + 1 >= this.playlist.length;
    if (this.repeat == 'one') {
      this.seek(0);
      this.play();
    } else if (this.repeat == 'all' && isLastSong) {
      this.playIndex(0);
    } else {
      this.next(true);
    }
  }

  get playing(): boolean {
    return this._player ? !this._player.paused : false;
  }

  get currentTime(): number {
    return (this._player && this._player.currentTime) || 0;
  }

  get duration(): number {
    return (this._player && this._player.duration) || 0;
  }

  get playbackRate(): number {
    return (this._player && this._player.playbackRate) || 1;
  }

  get volume(): number {
    return this._player
      ? this._player.volume
      : 1;
  }

  get touched(): boolean {
    return this._touched;
  }

  setVolume = (volume: number): void => {
    this.player.volume = Math.max(Math.min(volume, 1), 0);
  }
}

let _player: AudioPlayer | null = null;

export const getPlayer = (initialPlaylist: Playlist = []) => {
  if (!_player) {
    _player = new AudioPlayer(initialPlaylist);
    createNotifications(_player);
    setupMediaKeys(_player);
    setupListensCount(_player);
  }
  return _player;
};

export const createPlaylistFromCategory = (category: Category): Playlist => {
  return category.albums.map(album => createPlaylistFromAlbum(category, album)).flat(1);
}

export const createPlaylistFromAlbums = (albums: {category: Category, album: Album}[]): Playlist => {
  return albums.map(({category, album}) => createPlaylistFromAlbum(category, album)).flat(1);
};

export const createPlaylistFromAlbum = (category: Category, album: Album, songs?: Song[]): Playlist => {
  if (!songs) {
    songs = album.songs;
  }
  return songs.map(song => createSong(category, album, song));
};

export const createSong = (category: Category, album: Album, song: Song): AudioPlayerSong => ({
  link: song.link,
  name: song.name,
  artist: song.artist,
  music: song.music,
  fileName: song.fileName,
  album: {
    link: album.link,
    name: album.name,
    art: album.art
  },
  category: {
    link: category.link
  }
});

export function songMatcher(song?: AudioPlayerSongLink) {
  return (s: AudioPlayerSongLink): boolean => !!song && song.link === s.link && song.album.link === s.album.link && song.category.link === s.category.link;
}

