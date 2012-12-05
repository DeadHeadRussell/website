(function() {

window.ajrussell = {
  register: register,
  require: require
};

var libraries = {};

function register(full_name, library) {
  if (arguments.length != 2) {
    throw new Error('primal.research.register requires 2 parameters');
  }

  var path = full_name.split('.');
  var library_path = libraries;

  for (var i = 0; i < path.length - 1; i++) {
    var name = path[i];
    if (!library_path[name]) {
      library_path[name] = {};
    }
    library_path = library_path[name];
  }

  var name = path[path.length - 1];
  if (library_path[name]) {
    console.error("Cannot register library: " + full_name +
            ". A library already exists");
    console.error({new_library: library, old_library: library_path[name]});
  } else {
    library_path[name] = library;
  }
}

function require(full_name) {
  var path = full_name.split('.');
  var library_path = libraries;

  for (var i = 0; i < path.length; i++) {
    var name = path[i];
    if (!library_path[name]) {
      return null;
    }
    library_path = library_path[name];
  }

  if (!library_path) {
    return null;
  }

  return library_path;
}

})();

