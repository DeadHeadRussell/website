import {useRouter} from 'next/router';

import {Album} from '../../components/album';
import {Root} from '../../components/root';
import {processData} from '../../data';
import {readData} from '../../dataReader';


const AlbumPage = ({album, menuData, audioPlayerData}) => {
  const router = useRouter();
  if (router.asPath.includes('?song=') && !router.query.song) {
    router.query.song = router.asPath
      .split('?')[1]
      .split('&')
      .find(q => q.startsWith('song='))
      .split('=')[1];
  }

  const songLink = router.query.song;
  const song = album && album.songs.find(song => song.link == songLink);

  const initialSongLink = song
    ? song.link
    : album.songs.length > 0 ? album.songs[0].link : null;

  const initialSong = initialSongLink && audioPlayerData.songs.findIndex(playerSong => playerSong.link === initialSongLink);

  return (
    <Root title={album.name} menuData={menuData} audioPlayerData={audioPlayerData} initialSong={initialSong}>
      <Album album={album} song={song} />
    </Root>
  );
};

export const getStaticPaths = async () => {
  const rawData = await readData();
  const {albums} = processData(rawData);
  const paths = albums.map(album => `/albums/${album.link}`);
  return {paths, fallback: false};
};

export const getStaticProps = async ({params}) => {
  const rawData = await readData();
  const {albums, menuData, audioPlayerData} = processData(rawData);

  const albumLink = params.id;
  const album = albums.find(album => album.link == albumLink);

  return {props: {album, menuData, audioPlayerData}};
};

export default AlbumPage;

