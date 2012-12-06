var fs = require('fs');

var data = null;
var data_path = '../Client/data.json';

exports.getData = function(callback) {
  callback(data);
};

exports.refreshData = function() {
  fs.readFile(data_path, function(err, file_data) {
      if (err) {
          return;
      }

      data = JSON.parse(file_data);
  });
};

exports.refreshData();

