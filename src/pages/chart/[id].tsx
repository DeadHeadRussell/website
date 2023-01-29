import {GetStaticPaths, GetStaticProps} from 'next';
import React, {FC} from 'react';

import {Chart} from '../../components/charts/chart';
import {Root} from '../../components/root';
import {charts, menu} from '../../data';


export interface ChartPageProps {
  chartType: string;
  chartLink: string;
}

const ChartPage: FC<ChartPageProps> = ({chartType, chartLink}) => {
  const chart = charts[chartType].find(c => c.link === chartLink);

  if (!chart) {
    throw new Error('Missing chart');
  }

  return (
    <Root title={chart.name} menu={menu}>
      <Chart chart={chart} />
    </Root>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = charts.collections.map(chart => `/chart/${chart.link}`).concat(
    charts.songs.map(chart => `/chart/${chart.link}`));
  return {paths, fallback: false};
};

export const getStaticProps: GetStaticProps<ChartPageProps> = ({params}) => {
  if (!params || !params.id) {
    throw Error('Missing chart link in URL');
  }

  const chartLink = Array.isArray(params.id) ? params.id[0] : params.id;

  const isCollection = charts.collections.find(chart => chart.link === chartLink);
  const isSong = charts.songs.find(chart => chart.link === chartLink);
  
  const chartType = isCollection
    ? 'collections'
    : isSong
      ? 'songs'
      : null;

  return {props: {chartLink, chartType}};
};

export default ChartPage;
