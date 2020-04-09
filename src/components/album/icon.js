import Avatar from '@material-ui/core/Avatar';

export const AlbumIcon = ({album}) => (
  <Avatar
    variant='square'
    src={album.art}
    alt='Album Art'
  />
);
