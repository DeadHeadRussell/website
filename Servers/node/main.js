var express = require('express');

var api = require('./api');
var clients = require('./clients');
var data = require('./data');

var app = express();

app.use(express.logger());

var port = 8001;
if (process.argv.length > 2) {
  port = parseInt(process.argv[2], 10);
}

var gets = {
  'api': getApi,
  'data': getData,
  'favicon.ico': getFavicon,
  'music': getMusic,
  'software': getSoftware,
  'resumes': getResumes,
  'home': getHome,
  '': getHome
};

app.get('/rock_opera', function(req, res) {
  app.set('views', '../../Clients/rock_opera/');
  res.render('main.ejs', data.getJsonObject());
});

app.get('/rock_opera/:file', function(req, res) {
  res.sendfile(req.params.file, {root: '../../Clients/rock_opera'});
});

app.get(/^\/([^\/]*)(\/.*)?$/, chooseClient, function(request, response, next) {
  var get_call = request.params[0];
  var path = '';
  if (request.params.length > 1) {
    path = request.params[1];
  }

  if (gets[get_call]) {
    gets[get_call](request, response, next, path);
  } else {
    getDefault(request, response, next, path);
  }
}, sendClientFile);

app.listen(port);

function getApi(request, response, next, path) {
  api.call(path, function(api_response) {
    response.set('Content-Type', api_response.getContentType());
    response.send(api_response.getContent());
  });
}

function getData(request, response, next, path) {
  var file = data.get(path);
  if (file.isAttachment()) {
    response.attachment(file.getName());
  }
  response.sendfile(file.getPath(), data.getOptions());
}

function getFavicon(request, response, next) {
  response.locals.client.getFavicon();
  next();
}

function getMusic(request, response, next) {
  response.locals.client.getMusicPage();
  next();
}

function getSoftware(request, response, next) {
  response.locals.client.getSoftwarePage();
  next();
}

function getResumes(request, response, next) {
  response.locals.client.getResumesPage();
  next();
}

function getHome(request, response, next) {
  response.locals.client.getHomePage();
  next();
}

function getDefault(request, response, next) {
  response.locals.client.getFile(request.path);
  next();
}

function chooseClient(request, response, next) {
  response.locals.client = clients.getClient(request);
  next();
}

function sendClientFile(request, response) {
  var last = response.locals.client.getLast();
  if (last.isTemplate()) {
    app.set('views', last.getOptions().root);
    response.render(last.getPath(), data.getJsonObject());
  } else {
    response.sendfile(last.getPath(), last.getOptions());
  }
}

