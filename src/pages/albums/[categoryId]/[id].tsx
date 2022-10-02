import {GetStaticProps, GetStaticPaths} from 'next';
import {useRouter} from 'next/router';
import React, {FC} from 'react';

import {createPlaylistFromAlbum} from '../../../audioPlayer';
import {Album} from '../../../components/album';
import {RemoteAlbum} from '../../../components/album/remote';
import {Root} from '../../../components/root';
import {categories, menu} from '../../../data';


export interface AlbumPageProps {
  albumLink: string;
  categoryLink: string;
}

const AlbumPage: FC<AlbumPageProps> = ({albumLink, categoryLink}) => {
  const category = categories[categoryLink];
  if (!category) {
    throw Error('Missing category');
  }

  const album = category.album[albumLink];
  if (!album) {
    throw Error('Missing album');
  }

  const router = useRouter();
  if (router.asPath.includes('?song=') && !router.query.song) {
    const query = router.asPath.split('?')[1] || '';
    const songQuery = query
      .split('&')
      .find(q => q.startsWith('song='));
    router.query.song = (songQuery || '').split('=')[1]
  }

  const songLink = router.query.song;
  const song = album && songLink && album.song[songLink];

  const playlist = createPlaylistFromAlbum(category, album);

  return (
    <Root title={album.name} menu={menu} initialPlaylist={playlist}>
      {album.links ? (
        <RemoteAlbum album={album} />
      ) : (
        <Album category={category} album={album} song={song} />
      )}
    </Root>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.values(categories).flatMap(category => category.albums.map(
    album => `/albums/${category.link}/${album.link}`
  ));
  return {paths, fallback: false};
};

export const getStaticProps: GetStaticProps<AlbumPageProps> = async ({params}) => {
  if (!params || !params.categoryId) {
    throw Error('Missing category link in URL');
  }

  if (!params || !params.id) {
    throw Error('Missing album link in URL');
  }

  const categoryLink = params.categoryId
  const albumLink = params.id;

  return {props: {categoryLink, albumLink}};
};

export default AlbumPage;

