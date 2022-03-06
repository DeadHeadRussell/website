import {GetStaticProps} from 'next';
import React, {FC} from 'react';

import {createPlaylistFromAlbum} from '../audioPlayer';
import {Contact} from '../components/contact';
import {Root} from '../components/root';
import {processData, Album, Category, MenuData} from '../data';
import {readData} from '../dataReader';


export interface ContactPageProps {
  menu: MenuData;
  playlistCategory: Category;
  playlistAlbum: Album;
}

const ContactPage: FC<ContactPageProps> = ({menu, playlistCategory, playlistAlbum}) => (
  <Root menu={menu} initialPlaylist={createPlaylistFromAlbum(playlistCategory, playlistAlbum)}>
    <Contact />
  </Root>
);

export const getStaticProps: GetStaticProps<ContactPageProps> = async () => {
  const rawData = await readData();
  const {menu, categories, highlightedCategory, highlightedAlbum} = processData(rawData);

  return {props: {
    menu,
    playlistCategory: highlightedCategory || categories[0],
    playlistAlbum: highlightedAlbum || categories[0].albums[0]
  }};
};

export default ContactPage;

