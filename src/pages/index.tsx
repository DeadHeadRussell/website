import {GetStaticProps} from 'next';
import React, {FC} from 'react';

import {createPlaylistFromAlbums} from '../audioPlayer';
import {AlbumGrid} from '../components/album/grid';
import {Root} from '../components/root';
import {processData, Album, Category, MenuData} from '../data';
import {readData} from '../dataReader';


export interface IndexPageProps {
  highlightedAlbums: {
    category: Category;
    album: Album;
  }[];
  menu: MenuData;
}

const IndexPage: FC<IndexPageProps> = ({highlightedAlbums, menu}) => (
  <Root menu={menu} initialPlaylist={createPlaylistFromAlbums(highlightedAlbums)}>
    <AlbumGrid albums={highlightedAlbums} />
  </Root>
);

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
  const rawData = await readData();
  const {categories, menu} = processData(rawData);
  if (categories.length < 3 || categories[0].albums.length < 1 || categories[1].albums.length < 1 || categories[2].albums.length < 1) {
    throw new Error('Missing categories or albums');
  }

  const highlightedAlbums = categories.slice(0, 3).map(category => ({
    category,
    album: category.albums[0]
  }));
  return {props: {highlightedAlbums, menu}};
};

export default IndexPage;
