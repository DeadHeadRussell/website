import {db} from './database';

init();

export interface InputSubscription {
  email: string;
  name: string;
  type: string;
  listener_id: string;
}

export interface Subscription extends InputSubscription {
  id: number;
  date: number;
}

function errorHandler(err: any) {
  // pass
}

export async function init() {
  db.serialize(() => {
    db.exec('CREATE TABLE IF NOT EXISTS subscriptions (id INTEGER NOT NULL PRIMARY KEY, email TEXT UNIQUE, name TEXT, type TEXT, date INTEGER)');
    db.exec('ALTER TABLE subscriptions ADD COLUMN listener_id TEXT', errorHandler);
  });
}

export function addSubscription(subscription: InputSubscription): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run('INSERT OR REPLACE INTO subscriptions (email, name, type, date, listener_id) VALUES ($email, $name, $type, $date, $listener_id)', {
      $email: subscription.email,
      $name: subscription.name,
      $type: subscription.type,
      $listener_id: subscription.listener_id,
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

export function getSubscriptions(): Promise<Subscription[]> {
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
