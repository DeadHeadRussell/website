import {makeStyles} from '@material-ui/styles';
import {FC, ReactNode} from 'react';
import Link from 'next/link';

import {Album, Song} from '../../data';


const useStyles = makeStyles(theme => ({
  link: {
    width: '100%',
    color: 'inherit',
    textDecoration: 'none'
  }
}));

export interface AlbumLinkProps {
  album: Album;
  song?: Song;
  children: ReactNode;
}

export const AlbumLink: FC<AlbumLinkProps> = ({album, song, children}) => {
  const classes = useStyles();
  const query = song ? {song: song.link} : {};
  
  return (
    <Link
      href={{
        pathname: '/albums/[id]',
        query
      }}
      as={{
        pathname: `/albums/${album.link}`,
        query
      }}
    >
      <a className={classes.link}>{children}</a>
    </Link>
  );
};
