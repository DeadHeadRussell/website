import {Album, Feed, Song} from './data';
import {setupListensCount} from './listensCount';
import {setupMediaKeys} from './mediaKeys';
import {createNotifications} from './notifications';

export type Action = 'PLAY' | 'PAUSE' | 'PREVIOUS' | 'NEXT' | 'SEEK';
export type Actions = {[Key in Action]: Key};

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

export type AudioPlayerListener = (action: Action) => void;

export interface AudioPlayerSongLink {
  link: string;
  album: {
    link: string;
  }
}

export type Playlist = AudioPlayerSong[];

export class AudioPlayer {
  actions: Actions = {
    PLAY: 'PLAY',
    PAUSE: 'PAUSE',
    PREVIOUS: 'PREVIOUS',
    NEXT: 'NEXT',
    SEEK: 'SEEK'
  };

  listeners: AudioPlayerListener[] = [];
  playlist: Playlist = [];
  currentSong: number = 0;

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

  play = (song?: AudioPlayerSongLink): void => {
    if (song) {
      this.setSong(this.playlist.findIndex(songMatcher(song)));
    }

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
  };

  get song(): AudioPlayerSong | undefined {
    return this.playlist[this.currentSong];
  }

  get player(): HTMLAudioElement {
    if (!this._player) {
      this._player = window.document.createElement('audio');
      if (this.song) {
        this._player.src = this.song.music;
      }
      this._player.addEventListener('ended', () => this.next(true));
      window.document.body.appendChild(this._player);
    }
    return this._player;
  }

  destroy(): void {
    this._player && this._player.remove();
    this._player = null;
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

export const createPlaylistFromAlbums = (albums: Album[]): Playlist => {
  return albums.map(album => createPlaylistFromAlbum(album)).flat(1);
};

export const createPlaylistFromAlbum = (album: Album, songs?: Song[]): Playlist => {
  if (!songs) {
    songs = album.songs;
  }
  return createPlaylistFromItems(songs.map(song => ({album, song})));
};

export const createPlaylistFromFeed = (feed: Feed): Playlist => {
  return feed.map(item => createPlaylistFromAlbum(item.album, item.songs)).flat(1);
};

export const createPlaylistFromItems = (items: {album: Album, song: Song}[]): Playlist => {
  return items.map(item => createSong(item.album, item.song));
};

export const createSong = (album: Album, song: Song): AudioPlayerSong => ({
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
});

function songMatcher(song: AudioPlayerSongLink) {
  return (s: AudioPlayerSongLink) => song.link === s.link && song.album.link === s.album.link;
}

