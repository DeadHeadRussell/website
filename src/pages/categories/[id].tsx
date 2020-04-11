import {AlbumGrid} from '../../components/album/grid';
import {Root} from '../../components/root';
import data, {categories} from '../../data';

const CategoryPage = ({categoryLink}) => {
  const category = categories.find(category => category.link == categoryLink);

  return (
    <Root title={category && category.name} categories={data.categories}>
      {category ? (
        <AlbumGrid albums={category.albums} />
      ) : (
        <p>Error! There is no category {categoryLink}</p>
      )}
    </Root>
  );
};

export const getStaticPaths = async () => {
  const paths = categories.map(category => `/categories/${category.link}`);
  return {paths, fallback: false};
};

export const getStaticProps = async ({params}) => {
  const categoryLink = params.id;
  return {props: {categoryLink}};
};

export default CategoryPage;

