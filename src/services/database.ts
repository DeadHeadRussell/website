import sqlite3 from 'sqlite3';

const dbpath = process.env.DATABASE_PATH;
if (!dbpath) {
  console.error('No DB path provided!');
}

export const db = new sqlite3.Database(dbpath);

