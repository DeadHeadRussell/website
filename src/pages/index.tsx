import {makeStyles} from '@material-ui/core/styles';
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

const useStyles = makeStyles(theme => ({
  logo: {
    display: 'block',
    width: '80%',
    maxWidth: 800,
    margin: 'auto'
  }
}));

const IndexPage: FC<IndexPageProps> = ({highlightedAlbums, menu}) => {
  const classes = useStyles();

  return (
    <Root menu={menu} initialPlaylist={createPlaylistFromAlbums(highlightedAlbums)}>
      <img className={classes.logo} src='/logo-transparent.png' alt='logo' />
      <AlbumGrid albums={highlightedAlbums} />
    </Root>
  );
};

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
  const rawData = await readData();
  const {categories, menu} = processData(rawData);
  const highlightedAlbums = categories.flatMap(category => [{
    category,
    album: category.albums[0]
  }, {
    category,
    album: category.albums[1]
  }, {
    category,
    album: category.albums[2]
  }]);
  if (highlightedAlbums.length < 3) {
    throw new Error('Missing categories or albums');
  }

  return {props: {highlightedAlbums, menu}};
};

export default IndexPage;
