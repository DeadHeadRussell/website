import {setupListensCount} from './listensCount';
import {setupMediaKeys} from './mediaKeys';
import {createNotifications} from './notifications';

export class AudioPlayer {
  actions = ['PLAY', 'PAUSE', 'PREVIOUS', 'NEXT', 'SEEK']
    .reduce((actions, action) => {
      actions[action] = action;
      return actions;
    }, {});

  constructor(songs, currentSong = 0) {
    this.listeners = [];
    this.songs = songs;
    this.currentSong = currentSong;

    if (typeof window !== 'undefined') {
      this.player;
    }
  }

  addListener = listener => {
    const index = this.listeners.push(listener) - 1;
    return () => {
      this.listeners.splice(index, 1);
    };
  };

  handleUpdate = action => {
    this.listeners.forEach(listener => listener(action));
  };

  setSong = currentSong => {
    this.currentSong = currentSong;
    this.player.src = this.song.music;
  }

  play = (album, song) => {
    if (song) {
      const newIndex = this.songs.findIndex(s =>
        s.link == song.link &&
        s.album.link == album.link
      );
      this.setSong(newIndex);
    }

    this.player.play();
    this.handleUpdate(this.actions.PLAY);
  }

  pause = () => {
    this.player.pause();
    this.handleUpdate(this.actions.PAUSE);
  }

  previous = () => {
    const isPlaying = this.playing;
    this.setSong((this.currentSong - 1 + this.songs.length) % this.songs.length);
    if (isPlaying) {
      this.player.play();
    }
    this.handleUpdate(this.actions.PREVIOUS);
  }

  next = forcePlay => {
    const isPlaying = this.playing;
    this.setSong((this.currentSong + 1) % this.songs.length);
    if (isPlaying || forcePlay) {
      this.player.play();
    }
    this.handleUpdate(this.actions.NEXT);
  }

  seek = newTime => {
    this.player.currentTime = newTime;
    this.handleUpdate(this.actions.SEEK);
  }

  seekOffset = offset => {
    this.player.currentTime += offset;
    this.handleUpdate(this.actions.SEEK);
  };

  get song() {
    return this.songs[this.currentSong];
  }

  get player() {
    if (!this._player) {
      this._player = window.document.createElement('audio');
      this._player.src = this.song.music;
      this._player.addEventListener('ended', () => this.next(true));
      window.document.body.appendChild(this._player);
    }
    return this._player;
  }

  destroy() {
    this._player.remove();
  }

  get playing() {
    return this._player && !this._player.paused;
  }

  get currentTime() {
    return (this._player && this._player.currentTime) || 0;
  }

  get duration() {
    return (this._player && this._player.duration) || 0;
  }

  get playbackRate() {
    return (this._player && this._player.playbackRate) || 1;
  }

  get volume() {
    return this._player
      ? this._player.volume
      : 1;
  }

  setVolume = volume => {
    this.player.volume = Math.max(Math.min(volume, 1), 0);
  }
}

let _player = null;

export const getPlayer = (songs = null, initialSong = 0) => {
  if (!_player) {
    if (!songs) {
      throw new Error('A songs list is required');
    }
    _player = new AudioPlayer(songs, initialSong);
    createNotifications(_player);
    setupMediaKeys(_player);
    setupListensCount(_player);
  }
  return _player;
};

