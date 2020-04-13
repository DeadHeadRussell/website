import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SaveAltIcon from '@material-ui/icons/SaveAlt';


export const AudioPlayerDownload = ({song}) => (
  <Hidden smDown>
    <Tooltip title='Download Song'>
      <IconButton
        aria-label='download song'
        component='a'
        href={song.url}
        download={`${song.name}.${song.extension}`}
      >
        <SaveAltIcon />
      </IconButton>
    </Tooltip>
  </Hidden>
);
