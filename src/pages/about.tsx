import {GetStaticProps} from 'next';
import React, {FC} from 'react';

import {About} from '../components/about';
import {Root} from '../components/root';
import {menu} from '../data';


const AboutPage: FC<{}> = () => (
  <Root menu={menu}>
    <About />
  </Root>
);

export default AboutPage;

