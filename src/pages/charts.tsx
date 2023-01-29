import React, {FC} from 'react';

import {ChartsGrid} from '../components/charts/grid';
import {Root} from '../components/root';
import {charts, menu} from '../data';


const ChartsPage: FC<{}> = () => (
  <Root menu={menu}>
    <ChartsGrid charts={charts} />
  </Root>
);

export default ChartsPage;

