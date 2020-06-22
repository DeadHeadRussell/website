import Avatar from '@material-ui/core/Avatar';
import {FC} from 'react';


export interface AlbumIconProps {
  albumArt: string;
}

export const AlbumIcon: FC<AlbumIconProps> = ({albumArt}) => (
  <Avatar
    variant='square'
    src={albumArt}
    alt='Album Art'
  />
);
