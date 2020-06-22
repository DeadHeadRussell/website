import {GetStaticProps} from 'next';
import {FC} from 'react';

import {createPlaylistFromAlbum} from '../audioPlayer';
import {Contact} from '../components/contact';
import {Root} from '../components/root';
import {processData, Album, MenuData} from '../data';
import {readData} from '../dataReader';


export interface ContactPageProps {
  menu: MenuData;
  playlistAlbum: Album;
}

const ContactPage: FC<ContactPageProps> = ({menu, playlistAlbum}) => (
  <Root menu={menu} initialPlaylist={createPlaylistFromAlbum(playlistAlbum)}>
    <Contact />
  </Root>
);

export const getStaticProps: GetStaticProps<ContactPageProps> = async () => {
  const rawData = await readData();
  const {menu, albums} = processData(rawData);
  const playlistAlbum = albums.find(album => album.link === 'fawm_2020');

  if (!playlistAlbum) {
    throw new Error('Missing album');
  }

  return {props: {menu, playlistAlbum}};
};

export default ContactPage;

