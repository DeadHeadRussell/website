import {db} from './database';

init();

export interface Listen {
  id: number;
  album_link: string;
  song_link: string;
  date: number;
  user_ip: string | null;
}

export async function init() {
  db.exec('CREATE TABLE IF NOT EXISTS listens (id INTEGER NOT NULL PRIMARY KEY, album_link TEXT, song_link TEXT, date INTEGER)'); 
  db.exec('ALTER TABLE listens ADD COLUMN user_ip TEXT', function(err) {
    // pass
  });
}

export function addListen(album: string, song: string, userIp: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO listens (album_link, song_link, date, user_ip) VALUES ($album, $song, $date, $user_ip)', {
      $album: album,
      $song: song,
      $date: Date.now(),
      $user_ip: userIp
    }, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function getListens(): Promise<Listen[]> {
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

