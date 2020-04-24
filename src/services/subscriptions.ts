import {db} from './database';

init();

export async function init() {
  db.exec('CREATE TABLE IF NOT EXISTS subscriptions (id INTEGER NOT NULL PRIMARY KEY, email TEXT UNIQUE, type TEXT, date INTEGER)');
}

export function addSubscription(email, type) {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO subscriptions (email, type, date) VALUES ($email, $type, $date)', {
      $email: email,
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
