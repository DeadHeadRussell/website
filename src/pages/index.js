import {AlbumGrid} from '../components/album/grid';
import {Root} from '../components/root';
import data, {highlightedAlbums} from '../data';

export default () => (
  <Root categories={data.categories}>
    <AlbumGrid albums={highlightedAlbums} />
  </Root>
);
