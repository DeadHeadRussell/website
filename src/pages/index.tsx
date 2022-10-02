import {makeStyles} from '@material-ui/core/styles';
import React, {FC} from 'react';

import {ArtistHeader} from '../components/artist/header';
import {RemoteAlbum} from '../components/album/remote';
import {Root} from '../components/root';
import {categories, menu} from '../data';


export interface IndexPageProps {}

const IndexPage: FC<IndexPageProps> = () => {
  return (
    <Root menu={menu}>
      <ArtistHeader />
      <RemoteAlbum album={categories.studio.album['leading-off']} />
    </Root>
  );
};

export default IndexPage;
