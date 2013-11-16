(function() {

function get(url, callback) {
  var x = new XMLHttpRequest();
  x.open('GET', url, true);
  x.addEventListener(
    'readystatechange',
    function(e) {
      if(e.target.readyState === 4 && e.target.status === 200) {
        console.log(e);
        callback(e.target.responseText);
      }
    },
    false
  );
  x.send();
}

function post(url, data, callback) {
  var x = new XMLHttpRequest();
  x.open('POST', url, true);
  x.addEventListener(
    'readystatechange',
    function(e) {
      if(e.target.readyState === 4 && e.target.status === 200) {
        console.log(e);
        callback(e.target.responseText);
      }
    },
    false
  );
  x.send(data);
}

window.utils = {
  get: get,
  post: post
};

})();

