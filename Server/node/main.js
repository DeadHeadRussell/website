var express = require('express');

var clients = require('./clients');
var data = require('./data');

var app = express();
var client = null;
var client_file = null;

app.get(/^\/data(\/.*)?$/, function(request, response) {
  response.sendfile(data.get(request.path), data.getOptions());
}, sendClientFile);

app.get(/^\/favicon.ico$/, chooseClient, function(request, response, next) {
  client.getFavicon(data);
  next();
}, sendClientFile);

app.get(/^\/music(\/.*)?$/, chooseClient, function(request, response, next) {
  client.getMusicPage(data);
  next();
}, sendClientFile);

app.get(/^\/soft(ware)?(\/.*)?$/, chooseClient, function(request, response, next) {
  client.getSoftwarePage(data);
  next();
}, sendClientFile);

app.get(/^\/resumes(\/.*)?$/, chooseClient, function(request, response, next) {
  client.getResumesPage(data);
  next();
}, sendClientFile);

/*
app.get(/^(\/home(\/.*)?)|(\/)?$/, chooseClient, function(request, response, next) {
  client.getHomePage(data);
  next();
}, sendClientFile);
*/

app.get(/.*/, chooseClient, function(request, response, next) {
  client.getFile(data, request.path);
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

