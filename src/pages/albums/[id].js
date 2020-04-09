import {useRouter} from 'next/router';

import {Album} from '../../components/album';
import {Root} from '../../components/root';
import data, {albums} from '../../data';


export default () => {
  const router = useRouter();

  const albumLink = router.query.id;
  const songLink = router.query.song;
  const album = albums.find(album => album.link == albumLink);
  const song = album && album.songs.find(song => song.link == songLink);

  return (
    <Root title={album && album.name} categories={data.categories}>
      {album ? (
        <Album album={album} song={song} />
      ) : (
        <p>Error! There is no album {albumLink}</p>
      )}
    </Root>
  );
}

