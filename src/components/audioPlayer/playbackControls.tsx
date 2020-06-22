import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import {FC} from 'react';

import {AudioPlayer} from '../../audioPlayer';
import {PlaybackState} from '../../utils';


export interface AudioPlaybackControlsProps {
  player: AudioPlayer;
  playbackState: PlaybackState;
}

export const AudioPlaybackControls: FC<AudioPlaybackControlsProps> = ({player, playbackState}) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const iconSize = sm ? 'small' : 'default';

  const previous = () => player.previous();
  const pause = () => player.pause();
  const play = () => player.play();
  const next = () => player.next();

  return (
    <Grid container spacing={0} wrap='nowrap'>
      <Grid item>
        <IconButton
          aria-label='previous song'
          disabled={playbackState.currentSong === 0}
          onClick={previous}
        >
          <SkipPreviousIcon fontSize={iconSize} />
        </IconButton>
      </Grid>
      {playbackState.playing ? (
        <Grid item>
          <IconButton aria-label='pause song' onClick={pause}>
            <PauseIcon fontSize={iconSize} />
          </IconButton>
        </Grid>
      ) : (
        <Grid item>
          <IconButton aria-label='play song' onClick={play}>
            <PlayArrowIcon fontSize={iconSize} />
          </IconButton>
        </Grid>
      )}
      <Grid item>
        <IconButton
          aria-label='next song'
          disabled={playbackState.currentSong === playbackState.playlist.length - 1}
          onClick={next}
        >
          <SkipNextIcon fontSize={iconSize} />
        </IconButton>
      </Grid>
    </Grid>
  );
};
