import {GetStaticProps, GetStaticPaths} from 'next';
import {useRouter} from 'next/router';
import {FC} from 'react';

import {createPlaylistFromAlbum} from '../../audioPlayer';
import {Album} from '../../components/album';
import {Root} from '../../components/root';
import {processData, Album as AlbumType, Category, MenuData} from '../../data';
import {readData} from '../../dataReader';


export interface AlbumPageProps {
  album: AlbumType;
  category: Category;
  menu: MenuData;
}

const AlbumPage: FC<AlbumPageProps> = ({album, category, menu}) => {
  const router = useRouter();
  if (router.asPath.includes('?song=') && !router.query.song) {
    const query = router.asPath.split('?')[1] || '';
    const songQuery = query
      .split('&')
      .find(q => q.startsWith('song='));
    router.query.song = (songQuery || '').split('=')[1]
  }

  const songLink = router.query.song;
  const song = album && album.songs.find(song => song.link == songLink);

  const playlist = createPlaylistFromAlbum(album);

  return (
    <Root title={album.name} menu={menu} initialPlaylist={playlist}>
      <Album album={album} category={category} song={song} />
    </Root>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const rawData = await readData();
  const {albums} = processData(rawData);
  const paths = albums.map(album => `/albums/${album.link}`);
  return {paths, fallback: false};
};

export const getStaticProps: GetStaticProps<AlbumPageProps> = async ({params}) => {
  if (!params || !params.id) {
    throw Error('Missing album link in URL');
  }

  const rawData = await readData();
  const {albums, categories, menu} = processData(rawData);

  const albumLink = params.id;
  const album = albums.find(album => album.link == albumLink);
  const category = categories.find(category => category.albums.find(album => album.link == albumLink));

  if (!album || !category) {
    throw Error('Missing album');
  }

  return {props: {album, category, menu}};
};

export default AlbumPage;

