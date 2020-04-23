import {db} from './database';

init();

export async function init() {
  db.exec('CREATE TABLE IF NOT EXISTS subscriptions (id INTEGER NOT NULL PRIMARY KEY, email TEXT UNIQUE, date INTEGER)');
}

export function addSubscription(email) {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO subscriptions (email, date) VALUES ($email, $date)', {
      $email: email,
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
