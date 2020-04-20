import {AlbumGrid} from '../components/album/grid';
import {Root} from '../components/root';
import {processData} from '../data';
import {readData} from '../dataReader';


const IndexPage = ({highlightedAlbums, menuData, audioPlayerData}) => (
  <Root menuData={menuData} audioPlayerData={audioPlayerData}>
    <AlbumGrid albums={highlightedAlbums} />
  </Root>
);

export const getStaticProps = async () => {
  const rawData = await readData();
  const {categories, menuData, audioPlayerData} = processData(rawData);
  const highlightedAlbums = [categories[0].albums[0], categories[1].albums[0], categories[2].albums[0]];
  return {props: {highlightedAlbums, menuData, audioPlayerData}};
};

export default IndexPage;
