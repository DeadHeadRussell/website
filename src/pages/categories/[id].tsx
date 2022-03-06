import {GetStaticPaths, GetStaticProps} from 'next';
import React, {FC} from 'react';

import {createPlaylistFromCategory} from '../../audioPlayer';
import {AlbumGrid} from '../../components/album/grid';
import {Root} from '../../components/root';
import {processData, Category, MenuData} from '../../data';
import {readData} from '../../dataReader';


export interface CategoryPageProps {
  category: Category;
  menu: MenuData;
}

const CategoryPage: FC<CategoryPageProps> = ({category, menu}) => (
  <Root title={category.name} menu={menu} initialPlaylist={createPlaylistFromCategory(category)}>
    <AlbumGrid albums={category.albums.map(album => ({category, album}))} />
  </Root>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const rawData = await readData();
  const {categories} = processData(rawData);
  const paths = categories.map(category => `/categories/${category.link}`);
  return {paths, fallback: false};
};

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({params}) => {
  if (!params || !params.id) {
    throw Error('Missing category link in URL');
  }

  const rawData = await readData();
  const {categories, menu} = processData(rawData);

  const categoryLink = params.id;
  const category = categories.find(category => category.link == categoryLink);

  if (!category) {
    throw new Error('Missing category');
  }

  return {props: {category, menu}};
};

export default CategoryPage;
