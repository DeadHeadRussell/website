import sqlite3 from 'sqlite3';

const dbpath = process.env.DATABASE_PATH;
if (!dbpath) {
  throw new Error('No DB path (DATABASE_PATH=...) provided!');
}

export const db = new sqlite3.Database(dbpath);

