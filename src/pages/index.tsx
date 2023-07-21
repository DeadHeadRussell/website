import {makeStyles} from '@material-ui/core/styles';
import React, {FC} from 'react';

import {ArtistHeader} from '../components/artist/header';
import {RemoteAlbum} from '../components/album/remote';
import {Root} from '../components/root';
import {feature, menu} from '../../data';


export interface IndexPageProps {}

const IndexPage: FC<IndexPageProps> = () => {
  return (
    <Root menu={menu}>
      <ArtistHeader />
      <RemoteAlbum album={feature} />
    </Root>
  );
};

export default IndexPage;
