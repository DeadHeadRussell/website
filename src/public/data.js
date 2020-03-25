import rawData from './data.json';

const tagMap = rawData.tags.reduce(
  (map, tag) => ({
    ...map,
    [tag.name]: tag
  }),
  {}
);

export default {
  ...rawData,
  songs: rawData.songs.map(song => ({
    ...song,
    tags: song.tags.map(tagName => tagMap[tagName])
  }))
};

