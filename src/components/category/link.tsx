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

export interface CategoryLinkProps {
  categoryLink: string;
  children: ReactNode;
}

export const CategoryLink: FC<CategoryLinkProps> = ({categoryLink, children}) => {
  const classes = useStyles();
  return (
    <Link
      href='/categories/[id]'
      as={`/categories/${categoryLink}`}
    >
      <a className={classes.link}>{children}</a>
    </Link>
  );
};
