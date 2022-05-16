import {db} from './database';
import * as databaseFilters from './databaseFilters';

init();

export interface InputListen {
  category_link: string;
  album_link: string;
  song_link: string;
  referrer: string | null;
  listener_id: string | null;
  listener_ip: string | null;
};

export interface Listen extends InputListen {
  id: number;
  date: number;
};

export const SONG_SEP = '.';

const FILTER_HANDLERS: databaseFilters.FilterHandlerMap = {
  'song': databaseFilters.createMultiStringHandler(SONG_SEP, [
    'category_link',
    'album_link',
    'song_link'
  ]),
  'album': databaseFilters.createMultiStringHandler(SONG_SEP, [
    'category_link',
    'album_link'
  ]),
  'category': databaseFilters.createStringHandler('category_link'),
  'date': databaseFilters.createDateHandler('date'),
  'referrer': databaseFilters.createStringHandler('referrer'),
  'listener': databaseFilters.createStringHandler('listener_id'),
  'ip': databaseFilters.createStringHandler('listener_ip')
};

function errorHandler(err: any) {
  // pass
}

export async function init() {
  db.serialize(() => {
    db.exec('CREATE TABLE IF NOT EXISTS listens (id INTEGER NOT NULL PRIMARY KEY, album_link TEXT, song_link TEXT, date INTEGER)');
    db.exec('ALTER TABLE listens ADD COLUMN user_ip TEXT', errorHandler);
    db.exec('ALTER TABLE listens ADD COLUMN category_link TEXT', errorHandler);
    db.exec('ALTER TABLE listens ADD COLUMN referrer TEXT', errorHandler);
    db.exec('ALTER TABLE listens ADD COLUMN listener_id TEXT', errorHandler);
    db.exec('ALTER TABLE listens RENAME COLUMN user_ip TO listener_ip', errorHandler);
  });
}

export function addListen(listen: InputListen): Promise<void> {
  // category: string, album: string, song: string, userIp: string, referrer: string, listenerId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO listens ' +
      '(category_link, album_link, song_link, date, listener_ip, referrer, listener_id) ' +
      'VALUES ($category, $album, $song, $date, $listener_ip, $referrer, $listener_id)', {
      $category: listen.category_link,
      $album: listen.album_link,
      $song: listen.song_link,
      $date: Date.now(),
      $referrer: listen.referrer,
      $listener_ip: listen.listener_ip,
      $listener_id: listen.listener_id
    }, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function getListens(filters?: databaseFilters.Filter[] | null): Promise<Listen[]> {
  var query: string = 'SELECT * FROM listens ';
  var params: any[] = [];

  if (filters) {
    const {query: filterQuery, params: filterParams} = databaseFilters.generateFilterSql(FILTER_HANDLERS, filters, 'AND');
    query += filterQuery;
    params = params.concat(filterParams);
  }

  return new Promise((resolve, reject) => {
    db.all(query, params, function(err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

