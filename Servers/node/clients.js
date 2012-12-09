exports.getDefaultClient = getDefaultClient;
exports.getClient = getClient;

var javascript_client = createJavascriptClient();
var noscript_client = createNoscriptClient();

var search_engines = [
    'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)'
];

function getDefaultClient() {
  return javascript_client;
}

function getClient(request) {
  var user_agent = request.get('user-agent');
  if (search_engines.indexOf(user_agent) >= 0) {
    return noscript_client;
  }

  return getDefaultClient();
}

function createJavascriptClient() {
  var path_root = '../../Clients/javascript/';
  var images_root = 'images/';
  var last_path = '';

  return {
    getFavicon: function() { last_path = images_root + 'favicon.ico'; },
    getHomePage: getMainPage,
    getMusicPage: getMainPage,
    getSoftwarePage: getMainPage,
    getResumesPage: getMainPage,
    getFile: function(path) { last_path = path; },
    getLast: function() {
      return {
        isTemplate: function() { return false; },
        getPath: function() { return last_path; },
        getOptions: function() { return { root: path_root }; }
      };
    }
  };

  function getMainPage() {
    last_path = 'index.html';
  }
}

function createNoscriptClient() {
  var path_root = '../../Clients/noscript/';
  var last_path = '';
  var is_template = true;

  return {
    getFavicon: function() { last_path = 'favicon.ico'; is_template = true; },
    getHomePage: function() { last_path = 'home.ejs'; is_template = true; },
    getMusicPage: function() { last_path = 'music.ejs'; is_template = true; },
    getSoftwarePage: function() { last_path = 'software.ejs'; is_template = true; },
    getResumesPage: function() { last_path = 'resumes.ejs'; is_template = true; },
    getFile: function(path) { last_path = path; is_template = false; },
    getLast: function() {
      return {
        isTemplate: function() { return is_template; },
        getPath: function() { return last_path; },
        getOptions: function() { return { root: path_root }; }
      };
    }
  };
}

