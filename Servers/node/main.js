var express = require('express');

var clients = require('./clients');
var data = require('./data');

var app = express();
var client = null;
var client_file = null;

app.get(/^\/data(\/.*)?$/, function(request, response) {
  var file = data.get(request.path);
  if (file.isAttachment()) {
    response.attachment(file.getName());
  }
  response.sendfile(file.getPath(), data.getOptions());
}, sendClientFile);

app.get(/^\/favicon.ico$/, chooseClient, function(request, response, next) {
  client.getFavicon();
  next();
}, sendClientFile);

app.get(/^\/music(\/.*)?$/, chooseClient, function(request, response, next) {
  client.getMusicPage();
  next();
}, sendClientFile);

app.get(/^\/soft(ware)?(\/.*)?$/, chooseClient, function(request, response, next) {
  client.getSoftwarePage();
  next();
}, sendClientFile);

app.get(/^\/resumes(\/.*)?$/, chooseClient, function(request, response, next) {
  client.getResumesPage();
  next();
}, sendClientFile);

app.get(/^\/home(\/.*)?$/, chooseClient, function(request, response, next) {
  client.getHomePage();
  next();
}, sendClientFile);

app.get(/^\/?$/, chooseClient, function(request, respnose, next) {
  client.getHomePage();
  next();
}, sendClientFile);

app.get(/.*/, chooseClient, function(request, response, next) {
  client.getFile(request.path);
  next();
}, sendClientFile);

app.listen(8001);

function chooseClient(request, response, next) {
  client = clients.getClient(request);
  next();
}

function sendClientFile(request, response) {
  response.sendfile(client.getLast(), client.getOptions());
}

