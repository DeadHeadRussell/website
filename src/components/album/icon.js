import Avatar from '@material-ui/core/Avatar';

export const AlbumIcon = ({albumArt}) => (
  <Avatar
    variant='square'
    src={albumArt}
    alt='Album Art'
  />
);
