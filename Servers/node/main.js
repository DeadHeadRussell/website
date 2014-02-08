var express = require('express');

var clients = require('./clients');
var data = require('./data');

var app = express();

app.use(express.logger());

var port = 8001;
if (process.argv.length > 2) {
  port = parseInt(process.argv[2], 10);
}

app.get(/^\/data(\/.*)?$/, function(request, response) {
  var file = data.get(request.path, request.query.download == "true");
  if (file.isAttachment()) {
    response.attachment(file.getName());
  }
  response.sendfile(file.getPath(), data.getOptions());
}, sendClientFile);

app.get(/^\/favicon.ico$/, chooseClient, function(request, response, next) {
  response.locals.client.getFavicon();
  next();
}, sendClientFile);

app.get(/^\/music(\/.*)?$/, chooseClient, function(request, response, next) {
  response.locals.client.getMusicPage();
  next();
}, sendClientFile);

app.get(/^\/soft(ware)?(\/.*)?$/, chooseClient, function(request, response, next) {
  response.locals.client.getSoftwarePage();
  next();
}, sendClientFile);

app.get(/^\/resumes(\/.*)?$/, chooseClient, function(request, response, next) {
  response.locals.client.getResumesPage();
  next();
}, sendClientFile);

app.get(/^\/home(\/.*)?$/, chooseClient, function(request, response, next) {
  response.locals.client.getHomePage();
  next();
}, sendClientFile);

app.get(/^\/?$/, chooseClient, function(request, response, next) {
  response.locals.client.getHomePage();
  next();
}, sendClientFile);

app.get(/.*/, chooseClient, function(request, response, next) {
  response.locals.client.getFile(request.path);
  next();
}, sendClientFile);

app.listen(port);

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

