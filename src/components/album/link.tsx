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
  albumLink: string;
  songLink?: string;
  children: ReactNode;
}

export const AlbumLink: FC<AlbumLinkProps> = ({albumLink, songLink, children}) => {
  const classes = useStyles();
  const query = songLink ? {song: songLink} : {};
  
  return (
    <Link
      href={{
        pathname: '/albums/[id]',
        query
      }}
      as={{
        pathname: `/albums/${albumLink}`,
        query
      }}
    >
      <a className={classes.link}>{children}</a>
    </Link>
  );
};
