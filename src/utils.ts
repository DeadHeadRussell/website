import {useEffect, useRef, useState} from 'react';

import {AudioPlayer, AudioPlayerAlbum, AudioPlayerSong, Playlist} from './audioPlayer';


export function useInterval(callback: () => void, delay: number): void {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback as any;
  }, [callback]);

  useEffect(() => {
    function tick() {
      (savedCallback.current as unknown as () => void)();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function formatTime(time: number, useMs?: boolean): string {
  if (!time && time !== 0) {
    return '';
  }

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const ms = Math.floor(time * 1000 % 1000);

  const minutesString = `${minutes}`;
  const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;
  const msString = ms < 10 ? `00${ms}` : ms < 100 ? `0${ms}` : `${ms}`;

  if (useMs) {
    return `${minutesString}:${secondsString}.${msString}`;
  } else {
    return `${minutesString}:${secondsString}`;
  }
}

export interface PlaybackState {
  playlist: Playlist;
  currentSong: number;
  album?: AudioPlayerAlbum;
  song?: AudioPlayerSong;
  playing: boolean;
  currentTime: number;
  currentTimeFormatted: string;
  duration: number;
  durationFormatted: string;
  volume: number;
}

export function usePlayback(player: AudioPlayer, useMs?: boolean): PlaybackState {
  const delay = useMs ? 50 : 250;

  const createState = () => ({
    playlist: player.playlist,
    currentSong: player.currentSong,
    album: player.song?.album,
    song: player.song,
    playing: player.playing,
    currentTime: player.currentTime,
    currentTimeFormatted: formatTime(player.currentTime, useMs),
    duration: player.duration,
    durationFormatted: formatTime(player.duration, useMs),
    volume: Math.round(player.volume * 100)
  });

  const [playbackState, setPlaybackState] = useState(createState());

  useInterval(() => {
    setPlaybackState(createState());
  }, delay);

  return playbackState;
}
