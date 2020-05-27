const fs = require('fs');

const RSS = require('rss');


const baseUrl = 'https://ajrussell.ca/'

function readData(path, assetsPath) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => err
      ? reject(err)
      : resolve(JSON.parse(data)));
  })
    .then(data => Promise.all(
      data.categories.flatMap(category => category.albums
        .flatMap(album => album.songs
          .map(song => {
            const extension = song.video ? 'mp4' : 'mp3';
            const path = `${assetsPath}/albums/${album.link}/songs/${song.link}.${extension}`;
            return new Promise((resolve, reject) =>
              fs.stat(path, (err, stats) => err
                ? reject(err)
                : resolve([album.link, song.link, stats])
              )
            );
          })
        )
      )
    ).then(stats => [data, stats]));
}

function createFeed(data, stats) {
  return createRssFeed(data, stats);
}

function createRssFeed(data, stats) {
  const feed = new RSS({
    title: 'Andrew Russell - Musician',
    description: 'Compositions, recordings, improvisations and more',
    feed_url: baseUrl + 'feed.xml',
    site_url: baseUrl,
    //image_url: baseUrl + 'cover.jpg',
    image_url: baseUrl + 'albums/covers/art.jpg',
    copyright: '2020 Andrew Russell',
    language: 'en-ca',
    categories: ['Music', 'Composition'],
    pubDate: new Date(),
    custom_namespaces: {
      'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd',
      'webfeeds': 'http://webfeeds.org/rss/1.0'
    },
    custom_elements: [
      {'itunes:subtitle': 'Compositions, recordings, improvisations and more'},
      {'itunes:author': 'Andrew Russell'},
      {'itunes:summary': 'Songs, albums, compositions, improvisations, mini concerts and everything else music.'},
      {'itunes:owner': [
        {'itunes:name': 'Andrew Russell'},
        {'itunes:email': 'deadhead.russell@gmail.com'}
      ]},
      {'itunes:image': {
        _attr: {
          href: baseUrl + 'cover.jpg'
        }
      }},
      {'itunes:category': [
        {_attr: {
          text: 'Music'
        }}
      ]},
      {'itunes:explicit': 'no'},

      {'webfeeds:cover': [
        {_attr: {image: baseUrl + 'albums/cover/art.jpg'}}
      ]},
      {'webfeeds:icon': baseUrl + 'favicon.png'},
      {'webfeeds:accentColor': '4caf50'}
    ]
  });

  data.categories.flatMap(category => {
    category.albums.flatMap(album => {
      album.songs.map(song => {
        const albumLink = `${baseUrl}albums/${album.link}/art.jpg`;
        const description = `<div><img src="${albumLink}" /></div>` + (song.description
          ? song.description.split('\n').map(text => `<div>${text}</div>`).join('\n')
          : '');

        const link = `${baseUrl}albums/${album.link}?song=${song.link}`;
        const extension = song.video ? 'mp4' : 'mp3';
        const mediaLink = `${baseUrl}albums/${album.link}/songs/${song.link}.${extension}`;
        const mediaMimetype = song.video ? 'video/mp4' : 'audio/mpeg';

        const songStats = stats.find(s => s[0] == album.link && s[1] == song.link);
        if (!songStats) {
          throw new Exception(`Could not find stats for ${album.link}, ${song.link}`);
        }
        const mediaSize = songStats[2].size;

        feed.item({
          title: song.name,
          description: description,
          url: link,
          categories: [category.name],
          author: 'Andrew Russell',
          date: new Date(song.date),
          enclosure: {
            url: mediaLink,
            size: mediaSize,
            type: mediaMimetype
          },
          custom_elements: [
						{'itunes:author': song.artist},
						{'itunes:image': [{_attr: {href: albumLink}}]}
						//{'itunes:duration': 'HH:MM:SS'}
          ]
        });
      });
    });
  });

  return feed.xml({indent: true});
}

function outputFeed(path, feed) {
  return new Promise((resolve, reject) =>
    fs.writeFile(`${path}/feed.xml`, feed, err => err
      ? reject(err)
      : resolve()
    )
  );
}

function run() {
  const dataPath = process.argv[2];
  const assetsPath = process.argv[3];
  const outputPath = process.argv[4];
  if (!dataPath || !outputPath) {
    console.error(`Usage: node ${process.argv[1]} <data.json> <assets/path/> <output/path/>`);
    process.exit(-1);
  }

  console.log('Generating');
  readData(dataPath, assetsPath)
    .then(([data, stats]) => createFeed(data, stats))
    .then(feed => outputFeed(outputPath, feed))
    .then(() => console.log('Done'))
    .catch(err => console.error(err));
}

run();

