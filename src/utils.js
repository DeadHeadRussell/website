import {useEffect, useRef, useState} from 'react';

export function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function formatTime(time, useMs) {
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

export function parseFormattedTime(timeStr) {
  if (timeStr && timeStr.includes(':')) {
    const [minutesStr, secondsStr] = timeStr.split(':');
    const minutes = parseInt(minutesStr, 10);
    const seconds = parseInt(secondsStr, 10);
    return minutes * 60 + seconds;
  }
  return parseInt(timeStr, 10);
}

export function usePlayback(player, useMs) {
  const delay = useMs ? 50 : 250;

  const createState = () => ({
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
