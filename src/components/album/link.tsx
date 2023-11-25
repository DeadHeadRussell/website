import {makeStyles} from '@material-ui/styles';
import {FC, ReactNode} from 'react';
import Link from 'next/link';


const useStyles = makeStyles(theme => ({
  link: {
    width: '100%',
    color: 'inherit',
    textDecoration: 'none'
  }
}));

export interface AlbumLinkProps {
  categoryLink: string;
  albumLink: string;
  songLink?: string;
  children: ReactNode;
}

export const AlbumLink: FC<AlbumLinkProps> = ({categoryLink, albumLink, songLink, children}) => {
  const classes = useStyles();
  const query = songLink ? {song: songLink} : {};
  
  return (
    <Link
      href='/albums/[categoryId]/[albumId]'
      as={{
        pathname: `/albums/${categoryLink}/${albumLink}`,
        query
      }}
    >
      <a className={classes.link}>{children}</a>
    </Link>
  );
};
