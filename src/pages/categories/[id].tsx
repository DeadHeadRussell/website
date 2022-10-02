import {GetStaticPaths, GetStaticProps} from 'next';
import React, {FC} from 'react';

import {AlbumGrid} from '../../components/album/grid';
import {Root} from '../../components/root';
import {categories, menu} from '../../data';


export interface CategoryPageProps {
  categoryLink: string;
}

const CategoryPage: FC<CategoryPageProps> = ({categoryLink}) => {
  const category = categories[categoryLink];

  if (!category) {
    throw new Error('Missing category');
  }

  return (
    <Root title={category.name} menu={menu}>
      <AlbumGrid albums={category.albums} />
    </Root>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = Object.values(categories).map(category => `/categories/${category.link}`);
  return {paths, fallback: false};
};

export const getStaticProps: GetStaticProps<CategoryPageProps> = ({params}) => {
  if (!params || !params.id) {
    throw Error('Missing category link in URL');
  }

  return {props: {categoryLink: params.id}};
};

export default CategoryPage;
