var fs = require('fs');

var data_path_root = '../data/';
var data_path = 'data.json';
var data = null;

exports.get = function(path) {
  path_parts = path.split('/');
  path_parts.shift();

  if (path[path.length - 1] == '/') {
    path_parts.pop();
  }

  var is_attachment = false;
  // This is not technically correct.
  if (path.indexOf('.mp3') >= 0 || path.indexOf('.zip') >= 0) {
    is_attachment = true;
  }

  if (path_parts.length == 0) {
    path = data_path;
  } else {
    path = path_parts.join('/');
  }

  var name = decodeURIComponent(path_parts[path_parts.length - 1]);

  return {
    isAttachment: function() { return is_attachment; },
    getPath: function() { return path; },
    getName: function() { return name; }
  };
};

exports.getOptions = function() {
  return {
    root: data_path_root
  };
};

exports.getJsonObject = function() {
  return data;
}

refreshData();

function refreshData() {
  var path = data_path_root + data_path;
  var stream = fs.createReadStream(path);
  stream.setEncoding('utf8');

  var json_string = '';

  stream.on('data', function(data) {
    json_string += data;
  });

  stream.on('end', function() {
    data = JSON.parse(json_string);
  });
}

