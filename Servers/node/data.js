var data_path_root = '../data/';
var data_path = 'data.json';

exports.get = function(path) {
  path_parts = path.split('/');
  path_parts.shift();
  path_parts.shift();

  if (path[path.length - 1] == '/') {
    path_parts.pop();
  }

  if (path_parts.length == 0) {
    return data_path;
  }

  return path_parts.join('/');
};

exports.getOptions = function() {
  return {
    root: data_path_root
  };
};

