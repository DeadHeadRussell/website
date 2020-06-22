import {GetStaticProps} from 'next';
import {FC} from 'react';

import {createPlaylistFromFeed} from '../audioPlayer';
import {Feed} from '../components/feed';
import {Root} from '../components/root';
import {processData, Feed as FeedType, MenuData} from '../data';
import {readData} from '../dataReader';


export interface RecentPageProps {
  recentFeed: FeedType;
  menu: MenuData;
}

const RecentPage: FC<RecentPageProps> = ({recentFeed, menu}) => (
  <Root menu={menu} initialPlaylist={createPlaylistFromFeed(recentFeed)}>
    <Feed title='Recent' feed={recentFeed} />
  </Root>
);

export const getStaticProps: GetStaticProps<RecentPageProps> = async () => {
  const rawData = await readData();
  const {menu, categories} = processData(rawData);

  const recentFeed = categories
    .reduce((feed, category) => feed.concat(
      category.albums.flatMap(album => album.songs.map(song => ({
        date: new Date(song.date),
        category,
        album,
        song
      })))
    ), ([] as any[]))
    .sort((itemA, itemB) => itemA.date > itemB.date ? -1 : 1)
    .reduce((feed, item) => {
      const [previous] = feed.slice(-1);
      if (previous && previous.album.link === item.album.link) {
        previous.songs.push(item.song);
      } else {
        feed.push({
          category: item.category,
          album: item.album,
          songs: [item.song]
        });
      }
      return feed;
    }, ([] as FeedType[]))
    .slice(0, 5);

  return {props: {menu, recentFeed}};
};

export default RecentPage;

