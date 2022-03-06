import {db} from './database';

init();

export interface Listen {
  id: number;
  category_link: string;
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
  db.exec('ALTER TABLE listens ADD COLUMN category_link TEXT', function(err) {
    // pass
  });

  db.exec('UPDATE listens SET category_link = \'<old>\' WHERE category_link IS NULL', function(err) {
    // pass
  });
}

export function addListen(category: string, album: string, song: string, userIp: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO listens (category_link, album_link, song_link, date, user_ip) VALUES ($category, $album, $song, $date, $user_ip)', {
      $category: category,
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

