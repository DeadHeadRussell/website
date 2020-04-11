import {makeStyles} from '@material-ui/styles';
import {FC, ReactNode} from 'react';
import Link from 'next/link';

import {Category} from '../../data';


const useStyles = makeStyles(theme => ({
  link: {
    width: '100%',
    color: 'inherit',
    textDecoration: 'none'
  }
}));

export interface CategoryLinkProps {
  category: Category;
  children: ReactNode;
}

export const CategoryLink: FC<CategoryLinkProps> = ({category, children}) => {
  const classes = useStyles();
  return (
    <Link
      href='/categories/[id]'
      as={`/categories/${category.link}`}
    >
      <a className={classes.link}>{children}</a>
    </Link>
  );
};
