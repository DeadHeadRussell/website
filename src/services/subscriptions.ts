import {db} from './database';

init();

export async function init() {
  db.exec('CREATE TABLE IF NOT EXISTS subscriptions (id INTEGER NOT NULL PRIMARY KEY, email TEXT UNIQUE, name TEXT, type TEXT, date INTEGER)');
}

export function addSubscription(email, name, type) {
  return new Promise((resolve, reject) => {
    db.run('INSERT OR REPLACE INTO subscriptions (email, name, type, date) VALUES ($email, $name, $type, $date)', {
      $email: email,
      $name: name,
      $type: type,
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

export function getSubscriptions() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM subscriptions', function(err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
