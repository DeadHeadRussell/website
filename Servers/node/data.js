var data_path_root = '../data/';
var data_path = 'data.json';

exports.get = function(path) {
  path_parts = path.split('/');
  path_parts.shift();
  path_parts.shift();

  if (path[path.length - 1] == '/') {
    path_parts.pop();
  }

  var is_attachment = false;
  if (path.indexOf('.mp3') >= 0 || path.indexOf('.zip') >= 0) {
    is_attachment = true;
  }

  if (path_parts.length == 0) {
    path = data_path;
  } else {
    path = path_parts.join('/');
  }
  path = path.replace(/%3F/g, '\\?');

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

