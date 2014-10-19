(function() {

var README_URL = 'http://ajrussell.ca/api/getReadme/';

function getReadme(repo, callback) {
  utils.get(README_URL + repo, function(response_text) {
    callback(response_text);
  });
}

window.github = {
  getReadme: getReadme
};

})();

