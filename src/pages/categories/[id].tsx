import {AlbumGrid} from '../../components/album/grid';
import {Root} from '../../components/root';
import {processData} from '../../data';
import {readData} from '../../dataReader';


const CategoryPage = ({category, menuData, audioPlayerData}) => (
  <Root title={category.name} menuData={menuData} audioPlayerData={audioPlayerData}>
    <AlbumGrid albums={category.albums} />
  </Root>
);

export const getStaticPaths = async () => {
  const rawData = await readData();
  const {categories} = processData(rawData);
  const paths = categories.map(category => `/categories/${category.link}`);
  return {paths, fallback: false};
};

export const getStaticProps = async ({params}) => {
  const rawData = await readData();
  const {categories, menuData, audioPlayerData} = processData(rawData);

  const categoryLink = params.id;
  const category = categories.find(category => category.link == categoryLink);
  return {props: {category, menuData, audioPlayerData}};
};

export default CategoryPage;
