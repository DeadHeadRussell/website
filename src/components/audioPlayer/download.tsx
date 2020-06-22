import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import {FC} from 'react';

import {AudioPlayerSong} from '../../audioPlayer';


export interface AudioPlayerDownloadProps {
  song: AudioPlayerSong
}

export const AudioPlayerDownload: FC<AudioPlayerDownloadProps> = ({song}) => (
  <Hidden smDown>
    <Tooltip title='Download Song'>
      <IconButton
        aria-label='download song'
        component='a'
        href={song.music}
        download={`${song.name}.${song.extension}`}
      >
        <SaveAltIcon />
      </IconButton>
    </Tooltip>
  </Hidden>
);
