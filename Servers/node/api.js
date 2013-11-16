var request = require('request');

var apis = {
  'getReadme': getReadme
};

function getReadme(repo, callback) {
  var readme_url = 'https://api.github.com/repos/' + repo + '/readme';
  var markdown_url = 'https://api.github.com/markdown/raw';

  var headers = {
    'Authorization': 'token ' // PUT TOKEN HERE
  };

  // TODO: Check if rate limited, and if so, return error status.
  request(readme_url, function(error, response, body) {
    var response = JSON.parse(body);
    var markdown = new Buffer(response.content.replace(/\n/g, ''), 'base64').toString('ascii');

    headers['Content-Type'] = 'text/plain';

    var options = {
      url: markdown_url,
      body: markdown,
      headers: headers
    };

    request.post(options, function(error, response, body) {
      callback(createContent(body, 'text/html'));
    });
  });
}

function createContent(content, contentType) {
  return {
    getContent: function() { return content; },
    getContentType: function() { return contentType; }
  };
}

exports.call = function(path, callback) {
  var index = path.indexOf('/', 1);
  var api = path.substring(1, index);
  var data = path.substring(index + 1);
  if (apis[api]) {
    apis[api](data, callback);
  }
}

