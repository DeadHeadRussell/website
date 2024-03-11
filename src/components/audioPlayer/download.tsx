import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import {FC} from 'react';

import {AudioPlayerSong} from '../../audioPlayer';
import {staticLink} from '../../utils';


export interface AudioPlayerDownloadProps {
  song: AudioPlayerSong
}

export const AudioPlayerDownload: FC<AudioPlayerDownloadProps> = ({song}) => (
  <Hidden smDown>
    <Tooltip title='Download Song'>
      <IconButton
        aria-label='download song'
        component='a'
        target='blank'
        href={staticLink(song.music)}
        download={song.fileName}
      >
        <SaveAltIcon />
      </IconButton>
    </Tooltip>
  </Hidden>
);
