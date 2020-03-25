import fs from 'fs';

import compile from './compile';
import data from './data';

const outputFolder = process.argv[2];
if (!outputFolder) {
  console.error(`Usage: node ${process.argv[1]} < output_folder >`);
  exit(-1);
}

const {html, css} = compile(data);

fs.writeFile(
  `${outputFolder}/index.html`,
  `<!DOCTYPE html5>${html}`,
  function(err) {
    console.error(err);
  }
);

fs.writeFile(
  `${outputFolder}/index.css`,
  css,
  function(err) {
    console.error(err);
  }
);


