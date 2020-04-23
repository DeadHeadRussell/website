import {db} from './database';

init();

export async function init() {
  db.exec('CREATE TABLE IF NOT EXISTS listens (id INTEGER NOT NULL PRIMARY KEY, album_link TEXT, song_link TEXT, date INTEGER)'); 
}

export function addListen(album, song) {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO listens (album_link, song_link, date) VALUES ($album, $song, $date)', {
      $album: album,
      $song: song,
      $date: Date.now()
    }, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function getListens() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM listens', function(err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export function getListensCount(album, song) {
  return new Promise((resolve, reject) => {
    if (album && song) {
      db.get('SELECT count(*) as count FROM listens WHERE album_link = $album AND song_link = $song', {
        $album: album,
        $song: song
      }, function(err, count) {
        if (err) {
          reject(err);
        } else {
          resolve(count.count);
        }
      });
    } else if (!album && !song) {
      db.get('SELECT count(*) as count FROM listens', function(err, count) {
        if (err) {
          reject(err);
        } else {
          resolve(count.count);
        }
      });
    } else {
      reject(new Error('Invalid query'));
    }
  });
}
