import fs from 'fs';
import path from 'path';

import {RawData} from './data';


const DATA_FILE = path.join(process.cwd(), 'data.json');

export const readData = (): Promise<RawData> =>
  new Promise((resolve, reject) => {
    fs.readFile(DATA_FILE, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data.toString('utf8')) as RawData);
      }
    });
  });

