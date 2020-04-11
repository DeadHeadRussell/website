import {Album} from '../../components/album';
import {Root} from '../../components/root';
import data, {albums} from '../../data';


const AlbumPage = ({albumLink, songLink}) => {
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
};

export const getStaticPaths = async () => {
  const paths = albums.map(album => `/albums/${album.link}`);
  return {paths, fallback: false};
};

export const getStaticProps = async ({params}) => {
  const albumLink = params.id;
  const songLink = params.song || null;
  return {props: {albumLink, songLink}};
};

export default AlbumPage;

